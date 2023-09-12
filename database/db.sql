-- Создание таблицы для игроков
CREATE TABLE Players (
    PlayerID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(255) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    RegistrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Дополнительные поля, связанные с вашей игрой
);

-- Создание таблицы для персонажей
CREATE TABLE Characters (
    CharacterID INT PRIMARY KEY AUTO_INCREMENT,
    PlayerID INT,
    CharacterName VARCHAR(255) NOT NULL,
    Level INT,
    -- Дополнительные поля, связанные с вашей игрой
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID)
);

-- Создание таблицы для игровых предметов
CREATE TABLE Items (
    ItemID INT PRIMARY KEY AUTO_INCREMENT,
    ItemName VARCHAR(255) NOT NULL,
    ItemType VARCHAR(50),
    -- Дополнительные поля, связанные с вашей игрой
);

-- Создание таблицы для инвентаря игроков
CREATE TABLE Inventory (
    InventoryID INT PRIMARY KEY AUTO_INCREMENT,
    PlayerID INT,
    ItemID INT,
    Quantity INT,
    -- Дополнительные поля, связанные с вашей игрой
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID),
    FOREIGN KEY (ItemID) REFERENCES Items(ItemID)
);
