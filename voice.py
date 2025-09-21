import os
from dotenv import load_dotenv
import pyaudio
import wave
import requests
import pyttsx3
import audioop
from gtts import gTTS

load_dotenv()

WIT_AI_TOKEN = os.getenv("WIT_AI_TOKEN")

def save_speech_to_file(text, filename="output.wav"):
    """
    Generate speech from text and save as a WAV file using gTTS.
    """
    tts = gTTS(text=text, lang='en')
    tts.save(filename)

def record_audio_until_silence(filename="input.wav", silence_limit=1.2, rate=16000):
    chunk = 1024
    format = pyaudio.paInt16
    channels = 1

    p = pyaudio.PyAudio()
    stream = p.open(format=format, channels=channels, rate=rate, input=True, frames_per_buffer=chunk)
    print("Start speaking. Recording will stop when you pause...")

    frames = []
    silent_chunks = 0
    silence_threshold = 1000  # adjust this threshold if needed

    while True:
        data = stream.read(chunk)
        frames.append(data)

        rms = audioop.rms(data, 2)
        if rms < silence_threshold:
            silent_chunks += 1
        else:
            silent_chunks = 0

        if silent_chunks > int(rate / chunk * silence_limit):
            print("Silence detected, stopping recording.")
            break

    stream.stop_stream()
    stream.close()
    p.terminate()

    wf = wave.open(filename, 'wb')
    wf.setnchannels(channels)
    wf.setsampwidth(p.get_sample_size(format))
    wf.setframerate(rate)
    wf.writeframes(b''.join(frames))
    wf.close()

def speech_to_text(audio_file="input.wav"):
    headers = {
        "Authorization": f"Bearer {WIT_AI_TOKEN}",
        "Content-Type": "audio/wav"
    }
    with open(audio_file, "rb") as f:
        response = requests.post("https://api.wit.ai/speech?v=20221112", headers=headers, data=f)
        try:
            data = response.json()
            return data.get("_text")
        except Exception:
            return response.text if response.text else None

def speak_text(text):
    engine = pyttsx3.init()
    voices = engine.getProperty('voices')
    for voice in voices:
        if "Zira" in voice.name:
            engine.setProperty('voice', voice.id)
            break
    engine.setProperty('rate', 150)  # slower speech rate
    engine.say(text)
    engine.runAndWait()

def list_voices():
    engine = pyttsx3.init()
    voices = engine.getProperty('voices')
    for i, voice in enumerate(voices):
        print(f"Voice {i}: {voice.name} - {voice.id}")

if __name__ == "__main__":
    print("Available voices:")
    list_voices()

    record_audio_until_silence()
    user_text = speech_to_text()
    if user_text:
        print(f"Recognized Text: {user_text}")
        save_speech_to_file(user_text, "output.wav")
        speak_text(f"You said: {user_text}")
    else:
        print("Sorry, I could not recognize your speech.")
