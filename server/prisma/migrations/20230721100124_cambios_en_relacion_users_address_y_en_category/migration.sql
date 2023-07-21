/*
  Warnings:

  - You are about to alter the column `postalCode` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `city` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `country` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `name` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to drop the `UsersOnAddresses` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UsersOnAddresses` DROP FOREIGN KEY `UsersOnAddresses_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `UsersOnAddresses` DROP FOREIGN KEY `UsersOnAddresses_userId_fkey`;

-- AlterTable
ALTER TABLE `Address` ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `postalCode` VARCHAR(10) NOT NULL,
    MODIFY `city` VARCHAR(20) NOT NULL,
    MODIFY `country` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `Category` MODIFY `name` VARCHAR(20) NOT NULL;

-- DropTable
DROP TABLE `UsersOnAddresses`;

-- CreateIndex
CREATE UNIQUE INDEX `Category_name_key` ON `Category`(`name`);

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
