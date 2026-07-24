-- CreateTable
CREATE TABLE `food_data` (
    `id_food` INTEGER NOT NULL AUTO_INCREMENT,
    `food_name` VARCHAR(50) NULL,
    `price` INTEGER NULL,

    PRIMARY KEY (`id_food`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `drink_data` (
    `id_drink` INTEGER NOT NULL AUTO_INCREMENT,
    `drink_name` VARCHAR(50) NULL,
    `price` INTEGER NULL,

    PRIMARY KEY (`id_drink`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
