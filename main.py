import threading
from bot import show_avatar
from speak import generate_bot_response, speak_text
from voice import record_audio_until_silence, speech_to_text

def start_avatar():
    avatar_img_path = "Google_img.png"
    show_avatar(avatar_img_path)

def listen_and_get_text():
    print("Listening... Speak now.")
    record_audio_until_silence()
    text = speech_to_text()
    return text

def main_loop():
    print("Chat started. Say 'exit' or 'bye' to quit.")
    while True:
        user_input = listen_and_get_text()
        if not user_input:
            print("Sorry, I could not understand. Please try again.")
            continue

        print(f"You said: {user_input}")

        if user_input.lower() in ['exit', 'quit', 'bye']:
            print("Goodbye!")
            break

        bot_response = generate_bot_response(user_input)
        print(f"Bot: {bot_response}")
        speak_text(bot_response)

if __name__ == "__main__":
    # Run avatar display in a thread
    avatar_thread = threading.Thread(target=start_avatar, daemon=True)
    avatar_thread.start()

    # Run main conversation loop
    main_loop()
