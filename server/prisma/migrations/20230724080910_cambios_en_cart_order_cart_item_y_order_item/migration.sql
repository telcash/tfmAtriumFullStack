/*
  Warnings:

  - Added the required column `total` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `ProductsOnCarts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `ProductsOnOrders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cart` ADD COLUMN `total` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Order` ADD COLUMN `total` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `ProductsOnCarts` ADD COLUMN `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `ProductsOnOrders` ADD COLUMN `price` DOUBLE NOT NULL;
