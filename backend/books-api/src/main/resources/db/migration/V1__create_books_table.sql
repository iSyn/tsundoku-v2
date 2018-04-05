CREATE TABLE books(
    book_id SERIAL,
    user_id INT,
    read_status INT,
    book_title VARCHAR(100),
    book_author VARCHAR(50),
    book_desc VARCHAR(255)
)