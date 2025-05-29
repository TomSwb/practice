USE kamilah_schwab_books;
SELECT b.language,
    SUM(o.quantity) AS total_quantity
FROM orders o
    JOIN books b ON o.book_id = b.id
GROUP BY b.language;