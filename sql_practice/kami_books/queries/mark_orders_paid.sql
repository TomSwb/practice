USE kamilah_schwab_books;
ALTER TABLE orders
ADD COLUMN paid BOOLEAN NOT NULL DEFAULT FALSE
AFTER total;
SELECT *
FROM orders;
UPDATE orders
SET paid = TRUE
WHERE id = ? ? ?