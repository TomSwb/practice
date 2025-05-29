from dotenv import load_dotenv
load_dotenv()
import requests
import os

api_key = os.getenv("OPENAI_API_KEY") # sets up API key, need to add your own openai key
url = "https://api.openai.com/v1/chat/completions" # need to add the url needed
headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

# sets the back and force with the AI from your key
def send_message(user_message, thread_id=None):
    body = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": user_message}]
    }
    response = requests.post(url, headers=headers, json=body)
    return response.json()

# sets the initial thread number to none
current_thread_id = None

# welcome message - explanations
print("Welcome! Type your message and press Enter to send.")
print("Type 'exit' to end the program")
print("Type 'new' to switch conversation thread.")
print("Starting a new thread for you.\n")

# opens a thread list for savegards
threads = []

# begins the interaction loop
while True:
    user_message = input("You: ")
    if user_message.lower() == "exit": # allow user to exit the loop
        break
    elif user_message.lower() == "new": # allow use to create new threads
        print("A new thread began")
        continue

    response_data = send_message(user_message)
    # Parse the OpenAI response correctly:
    try:
        latest_message = response_data["choices"][0]["message"]["content"]
    except Exception as e:
        latest_message = f"Error: {response_data}"
    print(f"GPT: {latest_message}")

    # adds threads id to the list for tracking purposes
    threads.append(current_thread_id)
