import tkinter as tk
from PIL import Image, ImageTk

def show_avatar(image_path):
    root = tk.Tk()
    root.title("AI Legal Avatar")

    img = Image.open(image_path)
    tk_img = ImageTk.PhotoImage(img)
    panel = tk.Label(root, image=tk_img)
    panel.pack()

    root.mainloop()

if __name__ == "__main__":
    avatar_img_path = "Google_img.png"  # Your avatar image file
    show_avatar(avatar_img_path)
