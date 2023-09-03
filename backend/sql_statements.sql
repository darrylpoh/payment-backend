
-- Drop the payment_app database
DROP DATABASE IF EXISTS payment_app;
-- Create the payment_app database
CREATE DATABASE IF NOT EXISTS payment_app;
USE payment_app;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) NULL,
    full_name VARCHAR(100),
    date_of_birth DATE,
    phone_number VARCHAR(20) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the wallets table
CREATE TABLE IF NOT EXISTS wallets (
    wallet_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

-- Create the transactions table
CREATE TABLE IF NOT EXISTS transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL, -- Currency code (e.g., USD, EUR)
    isCurrentUserRequest BOOLEAN NOT NULL, -- TRUE if it's a user request, FALSE otherwise
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users (user_id),
    FOREIGN KEY (receiver_id) REFERENCES users (user_id)
);

-- Sample insert statements for four users
INSERT INTO users (username, email, full_name, date_of_birth, phone_number)
VALUES
    ('user1', 'user1@example.com', 'User One', '1990-01-15', '123-456-7890'),
    ('user2', 'user2@example.com', 'User Two', '1985-05-20', '987-654-3210'),
    ('user3', 'user3@example.com', 'User Three', '1998-12-10', '555-123-4567'),
    ('user4', 'user4@example.com', 'User Four', '1995-08-25', '111-222-3333');


-- Sample insert statements to create wallets for users
INSERT INTO wallets (user_id, balance)
VALUES
    (1, 1000.00),
    (2, 500.00),
    (3, 750.00),
    (4, 750.00);

-- Sample insert statements for transactions
-- User 1 sends $100 (USD) to User 2
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (1, 2, 100.00, 'USD', TRUE);

-- User 2 sends €50 (EUR) to User 3
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (2, 3, 50.00, 'EUR', TRUE);

-- User 3 sends £30 (GBP) to User 4
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (3, 4, 30.00, 'GBP', TRUE);

-- User 4 sends $75 (USD) to User 1
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (4, 1, 75.00, 'USD', TRUE);

-- User 1 sends €40 (EUR) to User 3
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (1, 3, 40.00, 'EUR', TRUE);

-- User 2 sends $50 (USD) to User 4
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (2, 4, 50.00, 'USD', TRUE);

-- User 3 sends £25 (GBP) to User 1
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (3, 1, 25.00, 'GBP', TRUE);

-- User 4 sends $60 (USD) to User 2
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (4, 2, 60.00, 'USD', TRUE);

-- User 1 sends $30 (USD) to User 4
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (1, 4, 30.00, 'USD', TRUE);

-- User 2 sends €20 (EUR) to User 3
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (2, 3, 20.00, 'EUR', TRUE);

-- User 3 sends £15 (GBP) to User 2
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (3, 2, 15.00, 'GBP', TRUE);

-- User 4 sends $45 (USD) to User 1
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (4, 1, 45.00, 'USD', TRUE);

-- User 1 sends €25 (EUR) to User 2
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (1, 2, 25.00, 'EUR', TRUE);

-- User 2 sends $55 (USD) to User 3
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (2, 3, 55.00, 'USD', TRUE);

-- User 3 sends £20 (GBP) to User 4
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (3, 4, 20.00, 'GBP', TRUE);

-- User 4 sends $70 (USD) to User 1
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (4, 1, 70.00, 'USD', TRUE);

-- User 1 sends €35 (EUR) to User 3
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (1, 3, 35.00, 'EUR', TRUE);

-- User 2 sends $40 (USD) to User 4
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (2, 4, 40.00, 'USD', TRUE);

-- User 3 sends £10 (GBP) to User 1
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (3, 1, 10.00, 'GBP', TRUE);

-- User 4 sends $80 (USD) to User 2
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (4, 2, 80.00, 'USD', TRUE);

-- User 1 sends $20 (USD) to User 4
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (1, 4, 20.00, 'USD', TRUE);

-- User 2 sends €30 (EUR) to User 3
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (2, 3, 30.00, 'EUR', TRUE);

-- User 3 sends £30 (GBP) to User 2
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (3, 2, 30.00, 'GBP', TRUE);

-- User 4 sends $25 (USD) to User 1
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (4, 1, 25.00, 'USD', TRUE);

-- User 1 sends €15 (EUR) to User 2
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (1, 2, 15.00, 'EUR', TRUE);

-- User 2 sends $35 (USD) to User 3
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (2, 3, 35.00, 'USD', TRUE);

-- User 3 sends £15 (GBP) to User 4
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (3, 4, 15.00, 'GBP', TRUE);

-- User 4 sends $90 (USD) to User 1
INSERT INTO transactions (sender_id, receiver_id, amount, currency, isCurrentUserRequest)
VALUES (4, 1, 90.00, 'USD', TRUE);

