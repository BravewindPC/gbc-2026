/*
  Warnings:

  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlayerMatches` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Organization" AS ENUM ('FITB', 'FMIPA', 'FSRD', 'FTI', 'FTMD', 'FTTM', 'FTSL', 'SAPPK', 'SBM', 'SF', 'SITH', 'STEI');

-- DropForeignKey
ALTER TABLE "_PlayerMatches" DROP CONSTRAINT "_PlayerMatches_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlayerMatches" DROP CONSTRAINT "_PlayerMatches_B_fkey";

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "organization" "Organization",
ADD COLUMN     "players1" TEXT[],
ADD COLUMN     "players2" TEXT[];

-- DropTable
DROP TABLE "Player";

-- DropTable
DROP TABLE "_PlayerMatches";
