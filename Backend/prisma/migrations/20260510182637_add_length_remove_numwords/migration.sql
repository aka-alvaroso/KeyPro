/*
  Warnings:

  - You are about to drop the column `numWords` on the `Text` table. All the data in the column will be lost.
  - Added the required column `length` to the `Text` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Length" AS ENUM ('short', 'medium', 'long');

-- AlterTable
ALTER TABLE "Text" DROP COLUMN "numWords",
ADD COLUMN     "length" "Length" NOT NULL;
