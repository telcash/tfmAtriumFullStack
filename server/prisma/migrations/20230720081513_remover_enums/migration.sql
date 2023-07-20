/*
  Warnings:

  - You are about to alter the column `role` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(20)`.
  - Made the column `availability` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `availability` VARCHAR(20) NOT NULL DEFAULT 'STOCK';

-- AlterTable
ALTER TABLE `User` MODIFY `role` VARCHAR(20) NOT NULL DEFAULT 'CLIENT';
