from voice import record_audio_until_silence, speech_to_text, speak_text
from llm import generate_bot_response

def start_voice_bot():
    intro_message = "Hello, I am your personal AI attorney. How can I help you today?"
    print(intro_message)
    speak_text(intro_message)  # Speak introduction aloud
    
    exit_keywords = ['exit', 'quit', 'bye', 'bye bye', 'ok bye', 'goodbye']

    while True:
        input("Press Enter to start speaking...")

        record_audio_until_silence()
        user_text = speech_to_text()

        if not user_text:
            print("Sorry, I could not understand. Please try again.")
            continue

        print(f"You said: {user_text}")

        if any(phrase in user_text.lower() for phrase in exit_keywords):
            farewell_message = (
                "Goodbye! Thank you for using the AI Legal Analyst Avatar. "
                "You can always return for more assistance."
            )
            print(farewell_message)
            speak_text(farewell_message)  # Speak goodbye aloud
            break

        reply = generate_bot_response(user_text)

        print(f"Bot: {reply}")
        speak_text(reply)

if __name__ == "__main__":
    start_voice_bot()
