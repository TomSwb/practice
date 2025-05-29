-- This SQL script demonstrates how to select data from multiple tables using JOINs.
USE kamilah_schwab_books;
SELECT c.name,
    b.language,
    o.quantity,
    o.total
FROM orders AS o
    JOIN clients AS c ON o.client_id = c.id
    JOIN books AS b ON o.book_id = b.id
ORDER BY c.name;