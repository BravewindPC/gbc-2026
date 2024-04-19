/*
  Warnings:

  - The `winners` column on the `Match` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "winners",
ADD COLUMN     "winners" "Organization";

-- DropEnum
DROP TYPE "Winner";
