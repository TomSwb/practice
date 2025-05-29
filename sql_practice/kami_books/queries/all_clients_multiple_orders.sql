USE kamilah_schwab_books;
SELECT c.name AS customer,
    SUM(o.quantity) AS total_ordered
FROM clients AS c
    JOIN orders AS o ON c.id = o.client_id
GROUP BY c.name
HAVING SUM(o.quantity) > 1
ORDER BY c.name;