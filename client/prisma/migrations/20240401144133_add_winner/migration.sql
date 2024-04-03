-- CreateEnum
CREATE TYPE "Winner" AS ENUM ('players1', 'players2');

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "winners" "Winner";
