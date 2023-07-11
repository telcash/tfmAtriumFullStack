-- AlterTable
ALTER TABLE `Product` ALTER COLUMN `description` DROP DEFAULT,
    ALTER COLUMN `price` DROP DEFAULT;

-- AlterTable
ALTER TABLE `User` ALTER COLUMN `refreshToken` DROP DEFAULT;
