/*
  Warnings:

  - A unique constraint covering the columns `[groupMembershipId]` on the table `MatchResult` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MatchResult_groupMembershipId_key" ON "MatchResult"("groupMembershipId");
