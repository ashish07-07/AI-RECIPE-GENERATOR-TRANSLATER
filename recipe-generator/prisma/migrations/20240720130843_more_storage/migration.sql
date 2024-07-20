/*
  Warnings:

  - You are about to alter the column `recipe` on the `Recipe` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50000)`.

*/
-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "recipe" SET DATA TYPE VARCHAR(50000);
