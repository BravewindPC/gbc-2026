/*
  Warnings:

  - The primary key for the `GroupMembership` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `GroupMembership` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "GroupMembership" DROP CONSTRAINT "GroupMembership_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "GroupMembership_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "number" SERIAL;

-- CreateTable
CREATE TABLE "MatchResult" (
    "id" TEXT NOT NULL,
    "groupMembershipId" TEXT NOT NULL,
    "played" INTEGER NOT NULL,
    "win" INTEGER NOT NULL,
    "lose" INTEGER NOT NULL,
    "setWin" INTEGER NOT NULL,
    "setLose" INTEGER NOT NULL,
    "scoreGain" INTEGER NOT NULL,
    "scoreLose" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "MatchResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MatchResult_groupMembershipId_idx" ON "MatchResult"("groupMembershipId");

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_groupMembershipId_fkey" FOREIGN KEY ("groupMembershipId") REFERENCES "GroupMembership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
