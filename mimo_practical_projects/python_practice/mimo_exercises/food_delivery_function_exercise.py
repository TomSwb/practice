# ====================
# Program to summarize an order based on user input.
# Uses lists to store available items and functions to check availability,
# validate input, and generate a summary of the order.
# ====================

# ====================
# Lists
# ====================

italian_food = ["Pasta Bolognese",
                "Pepperoni pizza",
                "Margherita pizza",
                "Lasagna"]

indian_food = ["Curry", "Chutney",
               "Samosa", "Naan"]

# ====================
# Functions
# ====================

# Confirms element is present in list and returns it if found


def find_meal(name, menu):
    return name if name in menu else None

# Returns element if found in list, choosing list according to condition


def select_meal(name, food_type):
    if food_type == "Italian":
        if name in italian_food:
            return find_meal(name, italian_food)
    elif food_type == "Indian":
        if name in indian_food:
            return find_meal(name, indian_food)
    else:
        return None

# Display list according to input in the type_input conditional variable


def display_available_meals(food_type):
    if type_input == "Italian":
        print("\nAvailable Italian Meals:")
        for meals in italian_food:
            print(meals)
    elif type_input == "Indian":
        print("\nAvailable Indian Meals:")
        for meals in indian_food:
            print(meals)
    else:
        print("Invalid food type")

# Display what user inputed in name and amount _input variables


def create_summary(name, amount, food_type):
    order = select_meal(name, type_input)
    if order:
        return f"You ordered {amount} {order}"
    else:
        return "Meal not found"

# ====================
# Main program flow: User input and returning result
# ====================


# Intro message
print("Welcome to the Food Order System!")

# 1st user input
type_input = input("\nWhat type of food do you want? (Italian, Indian): ")

# Return list elements according to 1st input
display_available_meals(type_input)

# 2nd user input
name_input = input("What meal do you choose?: ")
amount_input = input("How many times? ")

# Returned values according to input
result = create_summary(name_input, amount_input, type_input)
print(result)
