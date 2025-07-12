import sqlite3
import tkinter as tk
from tkinter import messagebox

# Connect to SQLite database
conn = sqlite3.connect("list_database.db")
cursor = conn.cursor()

# Create table if it doesn't exist
cursor.execute("""
CREATE TABLE IF NOT EXISTS list_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item TEXT NOT NULL
)
""")
conn.commit()

# Add an item to the database


def add_item():
    item = item_entry.get()
    if item.strip():  # Check if the input is not empty
        cursor.execute("INSERT INTO list_items (item) VALUES (?)", (item,))
        conn.commit()
        messagebox.showinfo("Success", f"'{item}' added to the list.")
        item_entry.delete(0, tk.END)  # Clear the input field
        display_list()
    else:
        messagebox.showerror("Error", "Item cannot be empty.")

# Delete an item from the database


def delete_item():
    item = item_entry.get()
    if item.strip():  # Check if the input is not empty
        cursor.execute("DELETE FROM list_items WHERE item = ?", (item,))
        if cursor.rowcount > 0:
            conn.commit()
            messagebox.showinfo("Success", f"'{item}' removed from the list.")
            item_entry.delete(0, tk.END)  # Clear the input field
            display_list()
        else:
            messagebox.showerror("Error", f"'{item}' is not in the list.")
    else:
        messagebox.showerror("Error", "Item cannot be empty.")

# Display all items in the database


def display_list():
    cursor.execute("SELECT item FROM list_items")
    items = cursor.fetchall()
    listbox.delete(0, tk.END)  # Clear the listbox
    if items:
        for row in items:
            listbox.insert(tk.END, row[0])  # Add each item to the listbox
    else:
        listbox.insert(tk.END, "The list is empty.")


# Create the main window
root = tk.Tk()
root.title("Shopping List Manager")

# Input field and buttons
item_entry = tk.Entry(root, width=30)
item_entry.pack(pady=10)

add_button = tk.Button(root, text="Add Item", command=add_item)
add_button.pack(pady=5)

delete_button = tk.Button(root, text="Remove Item", command=delete_item)
delete_button.pack(pady=5)

# Listbox to display items
listbox = tk.Listbox(root, width=50, height=15)
listbox.pack(pady=10)

# Display the initial list
display_list()

# Run the GUI event loop
root.mainloop()

# Close the database connection when the program ends
conn.close()
