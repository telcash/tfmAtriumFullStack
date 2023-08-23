-- CreateTable
CREATE TABLE `_AddressToCart` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AddressToCart_AB_unique`(`A`, `B`),
    INDEX `_AddressToCart_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AddressToCart` ADD CONSTRAINT `_AddressToCart_A_fkey` FOREIGN KEY (`A`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AddressToCart` ADD CONSTRAINT `_AddressToCart_B_fkey` FOREIGN KEY (`B`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
