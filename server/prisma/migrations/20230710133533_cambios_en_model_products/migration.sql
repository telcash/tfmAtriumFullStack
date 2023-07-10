/*
  Warnings:

  - You are about to alter the column `image` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `availability` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `price` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `image` VARCHAR(191) NOT NULL,
    MODIFY `stock` INTEGER NOT NULL DEFAULT 0,
    MODIFY `availability` ENUM('ALWAYS', 'NEVER', 'STOCK') NOT NULL DEFAULT 'STOCK';
