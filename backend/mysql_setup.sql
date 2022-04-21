-- create database db
CREATE DATABASE IF NOT EXISTS db;

-- use newly create database
USE db;


-- SCHOOL TABLE
CREATE TABLE `db`.`schools` (
    `school_id` SERIAL,
    `school_name` VARCHAR(255) NOT NULL,
    `school_location` VARCHAR(255) NOT NULL,
    `school_logo_url` VARCHAR(511) NOT NULL,
    PRIMARY KEY (`school_id`)
);

-- COURSE METADATA TABLE
CREATE TABLE `db`.`course_metadata` (
    `course_meta_id` SERIAL,
    `school_id` BIGINT UNSIGNED,
    `course_name` VARCHAR(255) NOT NULL,
    `department` VARCHAR(255) NOT NULL,
    `description` VARCHAR(1000) NOT NULL,
    PRIMARY KEY (`course_meta_id`),
    FOREIGN KEY (`school_id`) REFERENCES schools(`school_id`)
);

-- COURSE TABLE
CREATE TABLE `db`.`courses` (
    `course_id` SERIAL,
    `course_meta_id` BIGINT UNSIGNED,
    `max_seats` INT NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `canceled` BOOLEAN NOT NULL DEFAULT FALSE,
    'requirements_cc_id' BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`course_id`),
    FOREIGN KEY (`course_meta_id`) REFERENCES course_metadata(`course_meta_id`),
    FOREIGN KEY ('requirements_cc_id') REFERENCES requirements_cc('requirements_cc_id')
);

-- ROLES TABLE
CREATE TABLE `db`.`roles` (
    `role_id` SERIAL,
    `role_type` ENUM('student', 'ta', 'professor', 'admin') DEFAULT 'student',
    `course_id` BIGINT UNSIGNED,
    `school_id` BIGINT UNSIGNED,
    PRIMARY KEY (`role_id`),
    FOREIGN KEY (`course_id`) REFERENCES  courses(`course_id`),
    FOREIGN KEY (`school_id`) REFERENCES schools(`school_id`)
);

-- ACCOUNT TABLE
CREATE TABLE `db`.`accounts` (
    `account_id` SERIAL,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `school_id` BIGINT UNSIGNED,
    `role_id` BIGINT UNSIGNED NOT NULL,
    `last_logged_in` DATETIME DEFAULT NOW(),
    `logged_in` BOOLEAN NOT NULL DEFAULT 0,
    `offline_mode` BOOLEAN NOT NULL DEFAULT 0,
    `email` VARCHAR(255),
    PRIMARY KEY (`account_id`),
    FOREIGN KEY (`school_id`) REFERENCES schools(`school_id`),
    FOREIGN KEY (`role_id`) REFERENCES roles(`role_id`)
);


CREATE TABLE `db`.`friendships` (
    `friend_a` BIGINT UNSIGNED,
    `friend_b` BIGINT UNSIGNED,
    `friendship_time` DATETIME DEFAULT NOW(),
    PRIMARY KEY (`friend_a`, `friend_b`),
    FOREIGN KEY (`friend_a`) REFERENCES accounts(`account_id`),
    FOREIGN KEY (`friend_b`) REFERENCES accounts(`account_id`),

     -- Ensures that friend_a is always less than friend_b so
     -- that we can ensure we don't have duplicate friendships in a different order.
    CHECK(`friend_a` < `friend_b`)
);


CREATE TABLE `db`.`friend_requests` (
    `requester_id` BIGINT UNSIGNED,
    `requested_id` BIGINT UNSIGNED,
    `timestamp` DATETIME DEFAULT NOW(),
    `status` INT DEFAULT -1,
    PRIMARY KEY (`requester_id`, `requested_id`),
    FOREIGN KEY (`requester_id`) REFERENCES accounts(`account_id`),
    FOREIGN KEY (`requested_id`) REFERENCES accounts(`account_id`)
);

-- ANNOUNCEMENT TABLE
CREATE TABLE `db`.`announcements` (
    `announcement_id` SERIAL,
    `author_id` BIGINT UNSIGNED,
    `school_id` BIGINT UNSIGNED,
    `timestamp` DATETIME DEFAULT NOW(),
    PRIMARY KEY (`announcement_id`),
    FOREIGN KEY (`author_id`) REFERENCES accounts(`account_id`),
    FOREIGN KEY (`school_id`) REFERENCES schools(`school_id`)
);



-- ENROLLMENT TABLE
CREATE TABLE `db`.`enrollments` (
    `account_id` BIGINT UNSIGNED NOT NULL,
    `course_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`account_id`, `course_id`),
    FOREIGN KEY (`account_id`) REFERENCES accounts(`account_id`),
    FOREIGN KEY (`course_id`) REFERENCES courses(`course_id`)
);


-- WAITLIST TABLE
CREATE TABLE `db`.`waitlists` (
    `account_id` BIGINT UNSIGNED NOT NULL,
    `course_id` BIGINT UNSIGNED NOT NULL,
    `timestamp` DATETIME NOT NULL,
    PRIMARY KEY (`account_id`, `course_id`),
    FOREIGN KEY (`account_id`) REFERENCES  accounts(`account_id`),
    FOREIGN KEY (`course_id`) REFERENCES courses(`course_id`)
);

-- REQUIREMENTS TABLE
CREATE TABLE 'db'.'requirements' (
    'course_id' BIGINT UNSIGNED NOT NULL,
    'requirements_cc_id' BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY ('course_id', 'requirements_cc_id'),
    FOREIGN KEY ('requirements_cc_id') REFERENCES courses('requirements_cc_id'),
    FOREIGN KEY ('course_id') REFERENCES courses('course_id')
);

-- STUDENT REQUIREMENTS TABLE
CREATE TABLE 'db'.'student_requirements' (
  'account_id' BIGINT UNSIGNED NOT NULL,
  'university_requirements_id' BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY ('account_id', 'university_requirements_id'),
  FOREIGN KEY ('account_id') REFERENCES accounts('account_id'),
  FOREIGN KEY ('university_requirements_id') REFERENCES university_requirements('university_requirements_id')
);
-- UNIVERSITY REQUIREMENTS
CREATE TABLE 'db'.'university_requirements'(
    'school_id' BIGINT UNSIGNED NOT NULL,
    'UC_DISC' bool,
    'UC_PRW' bool,
    'UC_KNW' bool,
    'UC_Creativity_and_Aesthetics' bool,
    'UC_Historical_Contexts' bool,
    'UC_Language_and_Literature' bool,
    'UC_Science_and_Engineering' bool,
    'UC_Technology_and_Mathematics' bool,
    'UC_Humanities_and_Fine_Arts' bool,
    'UC_Natural_and_Applied_Sciences' bool,
    'university_requirements_id' SERIAL,
    PRIMARY KEY ('university_requirements_id'),
    FOREIGN KEY('school_id') REFERENCES schools('school_id')
);
-- REQUIREMENTS CC TABLE
CREATE TABLE 'db'.'requirements_cc'(
    'requirements_cc_id' SERIAL,
    'intro_math' bool,
    'intermediate_math' bool,
    'advanced_math' bool,
    'intro_eng' bool,
    'intermediate_eng' bool,
    'advanced_eng' bool,
    PRIMARY KEY ('requirements_cc_id')

);

-- REVIEWS Table
CREATE TABLE 'db'.'reviews'(
  'review_id' SERIAL,
  'course_id' BIGINT UNSIGNED,
  'rating' INTEGER NOT NULL check (rating between 0 and 5),
  'text' TEXT NOT NULL,
  PRIMARY KEY('review_id'),
  FOREIGN KEY ('course_id') REFERENCES courses('course_id')
);
INSERT INTO `roles`(role_type) VALUES('admin');
