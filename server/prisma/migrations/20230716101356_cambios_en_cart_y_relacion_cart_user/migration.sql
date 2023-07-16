/*
  Warnings:

  - You are about to drop the column `status` on the `Cart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `Cart_userId_fkey`;

-- AlterTable
ALTER TABLE `Cart` DROP COLUMN `status`,
    MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
