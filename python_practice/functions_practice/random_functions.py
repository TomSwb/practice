# Practicing creation of functions

# These are simple functions I am creating according to AI instruction
# There are not a copy of what AI told me to do but original creation
# I have some understanding on how a GUI work and try to adapt my code to it, e.g. english in all lower case to facilitate input understanding for the code


# Calculation of two variables from two parameters

def describe_rectangle(width, height):
    calculate_area = width * height
    calculate_perimeter = (width + height) * 2
    print(f"\nRectangle area: {calculate_area}")
    print(f"Rectangle perimeter: {calculate_perimeter}")


# describe_rectangle(40, 50)


# Calculate one variable from one parameter and a formulas


def convert_temperature(celsius):
    fahrenheit = (celsius * 9/5) + 32
    print(fahrenheit)


# convert_temperature(1)


# Advance model from previous exercise, using variable parameter
# Calculates two variables, using parameters and formulas


def convert_temperature_two_ways(value, scale="C"):
    if scale == "C":
        result = (value * 9/5) + 32
        print(f"{value}°C is {result}°F")
    elif scale == "F":
        result = result = (value - 32) * 5/9
        print(f"{value}°F is {result}°C")
    else:
        print("Invalid scale! Please use 'C' for Celsius or 'F' for Fahrenheit.")


# convert_temperature_two_ways(20, C)


# Use a variable as parameter to define output based on conditions

def greet_user(name, language="english"):
    if language == "english":
        print(f"Hello, {name}")
    elif language == "francais":
        print(f"Bonjour, {name}")
    elif language == "espanol":
        print(f"Hola! {name}")
    else:
        print("Language not recognised - defaulting to English")
        print(f"Hi, {name}")


# greet_user("Thomas", "english")


# Calclating discount based on original price


def calculate_discount(price, discount, currency="$"):
    if 0 <= discount <= 100:
        final_price = price - (price * discount / 100)
        return f"Original price: {currency}{price}, Discount: {discount}%, Final price: {currency}{final_price:.2f}"
    else:
        return "Error: Discount must be between 0 and 100."


# print(calculate_discount(100, 20))


# Splitting a bill between friends

def split_bill(total_bill, num_people, tip_percentage=0):
    if tip_percentage > 0:
        tip = (total_bill * tip_percentage) / 100
        split_total = (total_bill + tip) / num_people
        return f"Each person should pay {split_total:.2f}"
    else:
        split_total = total_bill / num_people
        return f"Each person should pay {split_total:.2f}"

# print(split_bill(270, 9, 20))


# Generate weekly meal plan

def weekly_meal_plan(days_for_plan=7):
    import random as r
    try:
        days_for_plan = int(input("Enter numbers of days: "))  # Assign input to days_for_plan
        if days_for_plan < 1:  # Ensure the input is a positive number
            print("Please enter a positive number.")
            return
    except ValueError:
        print("Invalid input, enter a valid number.")
        return

    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    meals = ["Pasta Bolo", "Lasagna", "Grilled Chicken", "Vegetable Stir Fry",
        "Beef Tacos", "Margherita Pizza", "Caesar Salad", "Tomato Soup", "Fish and Chips",
        "BBQ Ribs", "Chicken Curry", "Veggie Burger", "Sushi Rolls"]
    meal_plans = []

    # Dynamically extend the days list to match the number of days requested
    extended_days = [days[i % len(days)] for i in range(days_for_plan)]

    for day in extended_days:
        meals_choice = r.choice(meals)
        meal_plans.append(f"{day}: {meals_choice}")

    return meal_plans
    
# plan = weekly_meal_plan()
# print(plan)