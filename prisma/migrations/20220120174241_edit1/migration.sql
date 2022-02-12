/*
  Warnings:

  - You are about to drop the `convenience_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `conveniences` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rooms_conveniences` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `check_in` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `check_out` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `conveniences` DROP FOREIGN KEY `conveniences_convenience_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `rooms_conveniences` DROP FOREIGN KEY `rooms_conveniences_convenience_id_fkey`;

-- DropForeignKey
ALTER TABLE `rooms_conveniences` DROP FOREIGN KEY `rooms_conveniences_room_id_fkey`;

-- AlterTable
ALTER TABLE `hosts` MODIFY `description` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `rooms` ADD COLUMN `check_in` VARCHAR(191) NOT NULL,
    ADD COLUMN `check_out` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE `user_reviews` MODIFY `review` VARCHAR(500) NOT NULL;

-- DropTable
DROP TABLE `convenience_types`;

-- DropTable
DROP TABLE `conveniences`;

-- DropTable
DROP TABLE `rooms_conveniences`;

-- CreateTable
CREATE TABLE `options` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `logo_url` VARCHAR(191) NOT NULL,
    `is_main` BOOLEAN NOT NULL DEFAULT false,
    `option_type_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `option_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms_options` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` INTEGER NOT NULL,
    `option_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `options` ADD CONSTRAINT `options_option_type_id_fkey` FOREIGN KEY (`option_type_id`) REFERENCES `option_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rooms_options` ADD CONSTRAINT `rooms_options_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rooms_options` ADD CONSTRAINT `rooms_options_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `options`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
