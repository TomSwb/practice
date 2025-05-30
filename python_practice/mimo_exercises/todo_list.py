# custom list
todo_list = []

while True:  # begins loop

    # prints list according to if statement
    if not todo_list:
        print("Your ToDo list is empty")
    else:  # prints list adding an index number in front of task
        index = 1
        for task in todo_list:
            print(f"{index}. {task}")
            index += 1

    # adding options menu
    print("Options:")
    print("1) Add Task")
    print("2) Remove Task")
    print("3) Quit")

    choice = input()

    if choice == "1":
        print("Adding task")
        # add a new entry to list through input
        new_task = input("Enter the task: ")
        todo_list.append(new_task)
        print(f"Task {new_task} added")

    elif choice == "2":
        if not todo_list:
            print("Your ToDo list is empty")
        else:
            todo_list.pop()  # remove last item from list

    elif choice == "3":
        print("Quitting")  # quits the loop
        break
