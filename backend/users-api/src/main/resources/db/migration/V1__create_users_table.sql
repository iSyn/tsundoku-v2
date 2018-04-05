CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    date_created TIMESTAMP NOT NULL
);

--CREATE TABLE books (
--    book_id SERIAL PRIMARY KEY,
--    user_id INT NOT NULL,
--    read_status INT NOT NULL,
--    book_title VARCHAR(50),
--    book_author VARCHAR(50),
--    book_desc VARCHAR(255)
--)