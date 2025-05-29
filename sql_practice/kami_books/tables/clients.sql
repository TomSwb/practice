USE kamilah_schwab_books;
CREATE TABLE IF NOT EXISTS clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO clients (name, email, phone)
VALUES ('Ange', 'ange@example.com', '123-456-7890'),
    ('Antoine', 'antoine@example.com', '234-567-8901'),
    (
        'Benjamin',
        'benjamin@example.com',
        '345-678-9012'
    ),
    (
        'Caroline',
        'caroline@example.com',
        '456-789-0123'
    ),
    ('Helena', 'helen@example.com', '567-890-1234'),
    ('Jessica', 'jessica@example.com', '678-901-2345'),
    ('Jo', 'jo@example.com', '789-012-3456'),
    ('Joe', 'joe@example.com', '890-123-4567'),
    ('Jonas', 'jonas@example.com', '901-234-5678'),
    (
        'Jonathan',
        'jonathan@example.com',
        '012-345-6789'
    ),
    (
        'Michelle',
        'michelle@example.com',
        '123-456-7890'
    ),
    ('Milidzi', 'milidzi@example.com', '234-567-8901'),
    ('Olga', 'olga@example.com', '345-678-9012'),
    ('Tamara', 'tamara@example.com', '456-789-0123'),
    ('Thomas', 'thomas@example.com', '567-890-1234'),
    ('Valerie', 'valerie@example.com', '678-901-2345'),
    (
        'Victoria',
        'victoria@example.com',
        '789-012-3456'
    ),
    ('Julia', 'julia@example.com', '890-123-4567'),
    ('Nicola', 'nicola@example.com', '901-234-5678'),
    ('Mariana', 'mariana@example.com', '012-345-6789'),
    ('Anke', 'anke@example.com', '123-456-7890');