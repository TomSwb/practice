bot = "Mario"
bot_diff = 0.5
Thanks = "Thank you for chatting with me, it is it for now! "
greetings = "Come back when my creator learned more! Good bye!"


print(f"Hello! I am {bot}")
name = input("What is your name? ")
print(f"Hello {name}!, It is nice to meet you!")
age1 = input("How old are you? ")
print(f"{age1} is old! Life must be so difficult!")
print(f"I am a bot, I don't have an age, but my diffulty level is {bot_diff}")
age2 = input("What is your age again? ")
if age1 == age2:
    print(f"{age1 == age2}! I think I got it now!")
else:
    print(f"{age1} and {age2} are not the same! I am not sure what to think about that!")

print("As you discover me, and as my creator learns, my difficulty will increase!")

print(Thanks + greetings)
