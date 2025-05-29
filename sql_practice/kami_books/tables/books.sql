USE kamilah_schwab_books;
CREATE TABLE IF NOT EXISTS books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    language VARCHAR(100) NOT NULL,
    price DECIMAL (10, 2) NOT NULL CHECK (price > 0)
);
INSERT INTO books (title, language, price)
VALUES (
        'Switzerland through the Seasons',
        'English',
        20.00
    ),
    ('La suisse au fil des saisons', 'French', 20.00);