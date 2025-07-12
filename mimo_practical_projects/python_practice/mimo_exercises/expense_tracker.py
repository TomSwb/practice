
# Code analysing transactions from a tupple based list
# Allows printing, summarizing and analyzing of transactions

# Transactions list
data = [
    (749.17, "Investment Return"),
    (-11.54, "Utilities"),
    (-247.58, "Online Shopping"),
    (981.17, "Investment Return"),
    (-410.65, "Rent"),
    (310.60, "Rent"),
    (563.70, "Gift"),
    (220.79, "Salary"),
    (-49.85, "Car Maintenance"),
    (308.49, "Salary"),
    (-205.55, "Car Maintenance"),
    (870.64, "Salary"),
    (-881.51, "Utilities"),
    (518.14, "Salary"),
    (-264.66, "Groceries")
    ]

# Printing all transactions
def print_transactions(transactions):
    for transaction in transactions:
        amount, statement = transaction
        print(f"{amount} - {statement}")

# Printing a summary of the transactions
def print_summary(transactions):
    deposits = [transaction[0]
                for transaction in transactions if transaction[0] >= 0]
    withdrawals = [transaction[0]
                    for transaction in transactions if transaction[0] < 0]
    total_deposited = sum(deposits)
    total_withdrawals = sum(withdrawals)
    balance = total_deposited + total_withdrawals
    print(total_deposited)
    print(total_withdrawals)
    print(balance)

# Function analysing transaction from list
def analyze_transactions(transactions):
    transactions.sort()
    largest_withdrawal = transactions[0]
    largest_deposit = transactions[-1]
    print(f"{largest_withdrawal} - {largest_deposit}")

    deposits = [transaction[0] for transaction in transactions if transaction[0] >= 0]
    total_deposit = sum(deposits)
    average_deposit = total_deposit / len(deposits) if deposits else 0
    print(average_deposit)

    withdrawals = [transaction[0] for transaction in transactions if transaction[0] < 0]
    total_withdrawals = sum(withdrawals)
    average_withdrawals = total_withdrawals / len(withdrawals) if withdrawals else 0
    print(average_withdrawals)

# User loop with menu to navigate transactions
while True:
    print("\nChoose an option:")
    print("1. Print summary (type 'print')")
    print("2. Analyze transactions (type 'analyze')")
    print("3. Stop program (type 'stop')")
    choice = input("Enter your option: ")
    if choice == "print":
        print_summary(data)
    elif choice == "analyse":
        analyze_transactions(data)
    elif choice == "stop":
        break
    else:
        "Invalid choice"
