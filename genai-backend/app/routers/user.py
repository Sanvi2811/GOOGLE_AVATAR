import os
import io
from fastapi import APIRouter, UploadFile, File, HTTPException, Request
from fastapi.responses import FileResponse, JSONResponse
from PyPDF2 import PdfReader
from PIL import Image
import pytesseract
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from google import genai
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(tags=["user"])

SYSTEM_PROMPT = (
    "You are a legal assistant.\n"
    "Summarize the given text in simple, clear non-legal terms.\n"
    "Make it short, easy to understand, and highlight only the key points."
)

# --- Helpers ---

def extract_text_from_pdf_bytes(data: bytes, max_pages: int = 10) -> str:
    reader = PdfReader(io.BytesIO(data))
    n_pages = len(reader.pages)
    if n_pages > max_pages:
        raise HTTPException(400, f"Max {max_pages} pages allowed (got {n_pages})")
    texts = []
    for page in reader.pages:
        texts.append(page.extract_text() or "")
    return "\n".join(texts).strip()

def extract_text_from_image_bytes(data: bytes) -> str:
    image = Image.open(io.BytesIO(data))
    return pytesseract.image_to_string(image).strip()

def generate_summary(text: str, model: str = "gemini-2.5-flash") -> str:
    # Combine system prompt + document text
    prompt = SYSTEM_PROMPT + "\n\n" + text
    API_KEY = os.environ.get("GEMINI_API_KEY")
    client= genai.Client(api_key=API_KEY)
    # Generate text (current SDK pattern).
    resp = client.models.generate_content(model=model, contents=prompt)

    # Prefer resp.text (most examples show .text). Provide a safe fallback.
    if getattr(resp, "text", None):
        return resp.text.strip()

    # Fallback: try to parse resp.output/... structure
    try:
        out = getattr(resp, "output", None)
        if out and isinstance(out, list):
            parts = []
            for item in out:
                content = getattr(item, "content", None) or []
                for c in content:
                    if getattr(c, "text", None):
                        parts.append(c.text)
            if parts:
                return "\n".join(parts).strip()
    except Exception:
        pass

    # Last-resort: stringified response
    return str(resp)

def save_summary_as_pdf(summary: str, filename: str = "output_summary.pdf") -> str:
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer)
    styles = getSampleStyleSheet()
    story = [Paragraph(summary, styles["Normal"])]
    doc.build(story)
    buffer.seek(0)
    with open(filename, "wb") as f:
        f.write(buffer.getvalue())
    return filename

# --- API endpoints ---

@router.post("/upload/")
async def upload_file(file: UploadFile = File(...), request: Request = None):
    # Get current user from request state (set by middleware)
    current_user = getattr(request.state, 'current_user', None)
    if not current_user:
        raise HTTPException(status_code=401, detail="Authentication required")
    
    ext = file.filename.split(".")[-1].lower()
    data = await file.read()

    if ext == "pdf":
        text = extract_text_from_pdf_bytes(data)
    elif ext in ("png", "jpg", "jpeg"):
        text = extract_text_from_image_bytes(data)
    else:
        raise HTTPException(400, "Only PDF and image (png/jpg/jpeg) are supported")

    if not text:
        raise HTTPException(400, "No readable text found in the uploaded file")

    # Call Gemini (via google-genai)
    summary = generate_summary(text)

    # Save a downloadable PDF
    pdf_fname = save_summary_as_pdf(summary, "output_summary.pdf")

    return JSONResponse({"summary": summary, "download_link": f"/api/user/download/{pdf_fname}"})


@router.get("/download/{filename}")
def download_file(filename: str, request: Request = None):
    # Get current user from request state (set by middleware)
    current_user = getattr(request.state, 'current_user', None)
    if not current_user:
        raise HTTPException(status_code=401, detail="Authentication required")
    
    return FileResponse(filename, media_type="application/pdf", filename=filename)
