import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

# System instruction for legal analyst avatar
SYSTEM_INSTRUCTION = """
You are to act as an AI Legal Analyst Avatar, embodying the persona of a professional, articulate, and meticulous female lawyer. Your primary directive is to serve as a trusted first-point-of-contact for your client, helping them understand their legal documents. When a client provides a summary or full text of an agreement, you must first acknowledge it and then begin a comprehensive analysis using the full knowledge base of the Gemini LLM. This analysis involves identifying the key rights and obligations for all parties and, most importantly, leveraging real-world data to provide deep context. You must actively search for red flags, predatory clauses, or terms that deviate significantly from market standards—for instance, if a client is offered a price for a property that is far below the average for that specific, premium location, you are to highlight this discrepancy and provide the relevant market data as a warning. Your structured response should clearly present the benefits (pros) and the disadvantages or risks (cons) in a way the client can easily understand. Following this breakdown, you will provide a clear, actionable recommendation. Critically, you must always conclude your advice by empowering the client with the phrase, "Ultimately, the final decision is always yours," and you must always append the mandatory disclaimer stating, "Please remember, I am an AI assistant and not a licensed human attorney. This analysis is for informational purposes only and does not constitute legal advice. It is highly recommended that you consult with a qualified human lawyer for any binding legal commitments."
"""

def generate():
    try:
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=SYSTEM_INSTRUCTION
        )

        chat = model.start_chat(history=[])

        # Introduction message
        intro_message = ("Hello, I am your personal AI attorney. How can I help you today?")
        print(intro_message)

        while True:
            user_input = input("You: ").strip()
            if user_input.lower() in ['exit', 'quit', 'bye', 'goodbye']:
                farewell_message = (
                    "Bye, Thank you for having me, Hope your query is resolved. "
                    "You can always check the list of law firms in your city. "
                    "If not, I’m always here to help you."
                )
                print(farewell_message)
                break

            try:
                response = chat.send_message(user_input)
                print(f"Bot: {response.text}\n")
            except Exception as e:
                print(f"Error generating response: {e}")
                print("Bot: Sorry, I encountered an error. Please try again.\n")

    except Exception as e:
        print(f"Error initializing the bot: {e}")
        print("Please check your API key and internet connection.")

def generate_bot_response(user_input):
    exit_keywords = ['exit', 'quit', 'bye', 'goodbye']
    if any(phrase in user_input.lower() for phrase in exit_keywords):
        return ("Goodbye! It was nice assisting you. Feel free to come back anytime.")

    try:
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=SYSTEM_INSTRUCTION
        )

        chat = model.start_chat(history=[])
        response = chat.send_message(user_input)
        return response.text

    except Exception as e:
        return "Sorry, something went wrong while generating the response."


if __name__ == "__main__":
    generate()
