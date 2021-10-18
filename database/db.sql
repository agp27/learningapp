CREATE DATABASE database_courses;

USE database_courses;

-- USERS TABLE --
CREATE TABLE users(
 id INT(11) NOT NULL,
 username VARCHAR(16) NOT NULL,
 password VARCHAR(60) NOT NULL,
 fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
 ADD PRIMARY KEY (id);

ALTER TABLE users
 MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

-- COURSES TABLE --
CREATE TABLE courses (
 id INT(11) NOT NULL, 
 title VARCHAR(150) NOT NULL,
 description TEXT,
 user_id INT(11),
 created_at timestamp NOT NULL DEFAULT current_timestamp,
 CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE courses
 ADD PRIMARY KEY (id);

ALTER TABLE courses
 MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;