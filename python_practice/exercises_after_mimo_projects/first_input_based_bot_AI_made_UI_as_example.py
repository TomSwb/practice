import tkinter as tk

# Create the main window
root = tk.Tk()
root.title("Mario Bot")
root.geometry("800x600")

# Variables
bot = "Mario"
bot_diff = 0.5
Thanks = "Thank you for chatting with me, it is it for now!"
greetings = "Come back when my creator learned more! Good bye!"

# Functions


def greet_user():
    name = name_entry.get()
    output_label.config(text=f"Hello {name}!, It is nice to meet you!")


def ask_age():
    age1 = age_entry.get()
    output_label.config(text=f"{age1} is old! Life must be so difficult!")
    age2_label.pack()
    age2_entry.pack()
    age2_button.pack()


def check_age():
    age1 = age_entry.get()
    age2 = age2_entry.get()
    if age1 == age2:
        output_label.config(text=f"{age1 == age2}! I think I got it now!")
    else:
        output_label.config(
            text=f"{age1} and {age2} are not the same! I am not sure what to think about that!")
    final_message_label.pack()


# UI Elements
welcome_label = tk.Label(root, text=f"Hello! I am {bot}", font=("Arial", 14))
welcome_label.pack(pady=10)

name_label = tk.Label(root, text="What is your name?")
name_label.pack()
name_entry = tk.Entry(root)
name_entry.pack()
name_button = tk.Button(root, text="Submit Name", command=greet_user)
name_button.pack(pady=5)

age_label = tk.Label(root, text="How old are you?")
age_label.pack()
age_entry = tk.Entry(root)
age_entry.pack()
age_button = tk.Button(root, text="Submit Age", command=ask_age)
age_button.pack(pady=5)

age2_label = tk.Label(root, text="What is your age again?")
age2_entry = tk.Entry(root)
age2_button = tk.Button(root, text="Submit Age Again", command=check_age)

output_label = tk.Label(root, text="", font=("Arial", 12))
output_label.pack(pady=10)

final_message_label = tk.Label(
    root, text=f"{Thanks} {greetings}", font=("Arial", 10))

# Run the application
root.mainloop()
