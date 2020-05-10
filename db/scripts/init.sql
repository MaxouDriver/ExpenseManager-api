CREATE TABLE IF NOT EXISTS user (
    id_user INT NOT NULL AUTO_INCREMENT,
    avatar_user VARCHAR(1000),
    income_user INT,
    name_user VARCHAR(100) NOT NULL,
    email_user VARCHAR(100) NOT NULL,
    passwd_user VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_user)
);

CREATE TABLE IF NOT EXISTS expense_type (
    id_expense_type INT NOT NULL AUTO_INCREMENT,
    name_expense_type VARCHAR(100),
    PRIMARY KEY (id_expense_type)
);

CREATE TABLE IF NOT EXISTS expense (
    id_expense INT NOT NULL AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_expense_type INT NOT NULL,
    name_expense VARCHAR(100),
    description_expense VARCHAR(100),
    isShared_expense BOOLEAN NOT NULL,
    amount_expense INT,
    date_expense BIGINT NOT NULL,
    PRIMARY KEY (id_expense),
    FOREIGN KEY (id_user) REFERENCES user(id_user),
    FOREIGN KEY (id_expense_type) REFERENCES expense_type(id_expense_type)
);

INSERT INTO expense_type(name_expense_type) VALUES ("Food"),("Bill"), ("Object"), ("Service"), ("Payback");