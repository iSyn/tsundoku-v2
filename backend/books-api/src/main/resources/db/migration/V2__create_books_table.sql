CREATE TABLE books (
    book_id SERIAL,
    user_id INTEGER NOT NULL,
    read_status INTEGER,
    book_title VARCHAR(50),
    book_author VARCHAR(50)
);