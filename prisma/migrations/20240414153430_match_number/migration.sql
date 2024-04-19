-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "number" DROP NOT NULL,
ALTER COLUMN "number" DROP DEFAULT;
DROP SEQUENCE "Match_number_seq";
