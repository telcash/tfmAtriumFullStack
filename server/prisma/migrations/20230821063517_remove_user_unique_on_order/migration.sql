-- This is an empty migration.
ALTER TABLE `Order` DROP FOREIGN KEY `Order_userId_fkey`;
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;