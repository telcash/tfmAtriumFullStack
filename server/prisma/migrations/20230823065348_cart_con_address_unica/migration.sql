/*
  Warnings:

  - You are about to drop the `_AddressToCart` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[addressId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `_AddressToCart` DROP FOREIGN KEY `_AddressToCart_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AddressToCart` DROP FOREIGN KEY `_AddressToCart_B_fkey`;

-- AlterTable
ALTER TABLE `Cart` ADD COLUMN `addressId` INTEGER NULL;

-- DropTable
DROP TABLE `_AddressToCart`;

-- CreateIndex
CREATE UNIQUE INDEX `Cart_addressId_key` ON `Cart`(`addressId`);

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
