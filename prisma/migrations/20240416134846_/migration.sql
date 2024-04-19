/*
  Warnings:

  - The values [SELVA] on the enum `Organization` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Organization_new" AS ENUM ('HIMATIKA', 'TPB_FMIPA', 'KMPN', 'HIMATEK', 'HMS', 'HMASTRON', 'TERRA', 'GEA', 'TPB_FTMD', 'HMH_SELVA', 'IMMG', 'HME', 'HMIF', 'TPB_SF', 'TPB_FTI', 'TPB_FITB', 'TPB_FTTM', 'HMFT', 'HMO', 'KMKL', 'HMME', 'SITH_S', 'HMTL', 'HMT', 'TPB_STEI', 'TPB_SBM', 'TPB_FTSL', 'MTI', 'PATRA', 'IMA_G', 'AMISCA', 'HMF', 'HMRH', 'HMPPL', 'SITH_R');
ALTER TABLE "Player" ALTER COLUMN "organization" TYPE "Organization_new" USING ("organization"::text::"Organization_new");
ALTER TABLE "Match" ALTER COLUMN "organization1" TYPE "Organization_new" USING ("organization1"::text::"Organization_new");
ALTER TABLE "Match" ALTER COLUMN "organization2" TYPE "Organization_new" USING ("organization2"::text::"Organization_new");
ALTER TABLE "GroupMembership" ALTER COLUMN "organization" TYPE "Organization_new" USING ("organization"::text::"Organization_new");
ALTER TYPE "Organization" RENAME TO "Organization_old";
ALTER TYPE "Organization_new" RENAME TO "Organization";
DROP TYPE "Organization_old";
COMMIT;
