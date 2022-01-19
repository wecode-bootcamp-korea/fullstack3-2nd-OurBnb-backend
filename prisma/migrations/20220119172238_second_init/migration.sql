/*
  Warnings:

  - Added the required column `check_in` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `check_out` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hosts` MODIFY `description` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `rooms` ADD COLUMN `check_in` VARCHAR(191) NOT NULL,
    ADD COLUMN `check_out` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE `user_reviews` MODIFY `review` VARCHAR(500) NOT NULL;
