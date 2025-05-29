USE kamilah_schwab_books;
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    book_id INT NOT NULL,
    quantity INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);
INSERT INTO orders (client_id, book_id, quantity, total)
VALUES (1, 1, 1, 20.00),
    (1, 2, 1, 20.00),
    (2, 1, 1, 20.00),
    (3, 2, 1, 20.00),
    (4, 2, 1, 20.00),
    (5, 1, 1, 20.00),
    (6, 2, 1, 20.00),
    (7, 1, 1, 20.00),
    (8, 2, 1, 20.00),
    (9, 1, 1, 20.00),
    (9, 2, 1, 20.00),
    (10, 1, 1, 20.00),
    (11, 2, 1, 20.00),
    (12, 1, 1, 20.00),
    (13, 2, 1, 20.00),
    (14, 1, 1, 20.00),
    (14, 2, 1, 20.00),
    (15, 1, 1, 20.00),
    (16, 1, 1, 20.00),
    (16, 2, 1, 20.00),
    (17, 2, 2, 40.00),
    (18, 1, 1, 20.00),
    (19, 1, 1, 20.00),
    (19, 2, 1, 20.00),
    (20, 2, 1, 20.00),
    (21, 2, 2, 40.00);
SELECT *
FROM orders;