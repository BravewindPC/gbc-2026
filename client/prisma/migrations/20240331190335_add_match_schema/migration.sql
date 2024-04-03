/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Round" AS ENUM ('Round64', 'Round32', 'Round16', 'QuarterFinal', 'SemiFinal', 'Final');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('MixedDouble', 'MenDouble', 'MenSingle');

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "emailVerified",
DROP COLUMN "image",
ADD COLUMN     "password" TEXT;

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "round" "Round",
    "type" "Type",
    "date" TIMESTAMP(3),
    "score" JSONB,
    "umpire" TEXT,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlayerMatches" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerMatches_AB_unique" ON "_PlayerMatches"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerMatches_B_index" ON "_PlayerMatches"("B");

-- AddForeignKey
ALTER TABLE "_PlayerMatches" ADD CONSTRAINT "_PlayerMatches_A_fkey" FOREIGN KEY ("A") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerMatches" ADD CONSTRAINT "_PlayerMatches_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
