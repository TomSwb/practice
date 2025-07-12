# Practicing classes
# Using classes to add books info to a library

class Book: # Main class, defines and enters books info
    def __init__ (self, title, author):
        self.title = title # define title
        self.author = author # define author
        self.available = True # define availability

    def checkout(self): # Method allowing to redefine book availability
        if self.available:
            self.available = False
            return True
        else:
            return False

    def return_book(self): # method redefines availability if book returned
        self.available = True

    def display_info(self): # method to display all book info
        print(f"{self.title}, {self.author}, {self.available}")

class Library(Book): # class gathering books in a library (list)
    def __init__(self): # initiate the list
        self.books = []

    def add_book(self, book): # method to add a book
        self.books.append(book)

    def display_books(self): # method to disply the book info if in list
        for book in self.books:
            book.display_info()

    def get_book_by_title(self, title): # method to only get books through their title
        for book in self.books:
            if book.title.lower() == title.lower():
                return book
            return None

# books to enter in list using the class Book
book1 = Book("Haunted by love", "Kamilah Schwab")
book2 = Book("Bug you", "Patatrac Chamboulis")
book3 = Book("Myself", "Youto Filtralis")

# calling class Library in variable
library = Library()

# adding books in list calling the method from the class
library.add_book(book1)
library.add_book(book2)
library.add_book(book3)

# displaying the books availble callin the method from the class
library.display_books()