import sqlite3

# Connect to SQLite database (creates the database file if it doesn't exist)
conn = sqlite3.connect("list_database.db")
cursor = conn.cursor()

# Create a table to store the list items (if it doesn't already exist)
cursor.execute("""
CREATE TABLE IF NOT EXISTS list_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item TEXT NOT NULL
)
""")
conn.commit()

# Add an item to the database


def add_item(item):
    cursor.execute("INSERT INTO list_items (item) VALUES (?)", (item,))
    conn.commit()
    print(f"\nAdded '{item}' to the list.")

# Delete an item from the database


def delete_item(item):
    cursor.execute("DELETE FROM list_items WHERE item = ?", (item,))
    if cursor.rowcount > 0:  # Check if an item was deleted
        conn.commit()
        print(f"\nRemoved '{item}' from your list.")
    else:
        print(f"\n'{item}' is not in your list.")

# Display all items in the database


def display_list():
    cursor.execute("SELECT item FROM list_items")
    items = cursor.fetchall()
    print("\nList:")
    if items:
        for row in items:
            print(f"- {row[0]}")
    else:
        print("The list is empty.")
    print("\n")

# Display a menu with options


def display_option_menu():
    print("\nDo you want to:")
    print("1: Add an item?")
    print("2: Remove an item")
    print("3: Show list")
    print("Quit")


# Main program loop
while True:
    # Show menu and get user input
    display_option_menu()
    choice = input()

    # Handle invalid input
    if choice not in ["1", "2", "3", "Quit"]:
        print("Error, choose an option: 1, 2, 3, Quit")

    # Add an item
    elif choice == "1":
        new_item = input("\nNew item: ")
        add_item(new_item)

    # Remove an item
    elif choice == "2":
        remove_item = input("\nRemove: ")
        delete_item(remove_item)

    # Display the list
    elif choice == "3":
        display_list()

    # Quit the program
    elif choice == "Quit":
        print("\nClosing list")
        break

# Close the database connection when the program ends
conn.close()
