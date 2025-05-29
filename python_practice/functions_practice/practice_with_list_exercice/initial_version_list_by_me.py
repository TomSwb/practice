# Item list management program.
# Enables adding, removing and viewing of items.

# Initialize an empty list
list = []

# Add an item to the list.


def add_item(item):
    list.append(item)
    print(f"\nAdded '{item}' to the list.")

# Deletes an item from the list


def delete_item(item):
    list.remove(item)
    print(f"\nRemoved {item} from your list")

# Display the list in a formatted way.


def display_list(list):
    print("\nList:")
    for item in list:
        print(f"- {item}")
    print("\n")

# Display a menu with options


def display_option_menu():
    print("\nDo you want to:")
    print("1: Add an item?")
    print("2: Remove an item")
    print("3: Show list")
    print("Quit")


# Begins loop
while True:

    # Show menu - offer input
    display_option_menu()
    choice = input()

    # Manage input error - display manage if input is not valid
    if choice not in ["1", "2", "3", "Quit"]:
        print("Error, choose an option: 1, 2, 3, Quit")

    # Adds an item to list using function
    elif choice == "1":
        new_item = input("\nNew item: ")
        add_item(new_item)

    # Remove an item from the list using function - handle error if item not found
    elif choice == "2":
        remove_item = input("\nRemove ")
        if remove_item in list:
            delete_item(remove_item)
        else:
            print(f"{remove_item} is not in your list")

    # Display the list
    elif choice == "3":
        display_list(list)

    # Quits the loop
    elif choice == "Quit":
        print("\nClosing list")
        break
