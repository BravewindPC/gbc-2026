/*
  Warnings:

  - The values [AMISCA,HMPPL] on the enum `Organization` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Organization_new" AS ENUM ('HIMATIKA', 'TPB_FMIPA', 'KMPN', 'HIMATEK', 'HMS', 'HIMASTRON', 'HIMA_TG', 'HMTG_GEA', 'TPB_FTMD', 'HMH_SELVA', 'IMMG', 'HME', 'HMIF', 'TPB_SF', 'TPB_FTI', 'TPB_FITB', 'TPB_FTTM', 'HMFT', 'HMO_TRITON', 'KMKL', 'HMME', 'TPB_SITH_S', 'HMTL', 'HMT', 'TPB_STEI', 'TPB_SBM', 'TPB_FTSL', 'MTI', 'HMTM_PATRA', 'IMA_G', 'HMK_AMISCA', 'HMF', 'HMRH', 'HMP_PL', 'TPB_SITH_R');
ALTER TABLE "Player" ALTER COLUMN "organization" TYPE "Organization_new" USING ("organization"::text::"Organization_new");
ALTER TABLE "Match" ALTER COLUMN "organization1" TYPE "Organization_new" USING ("organization1"::text::"Organization_new");
ALTER TABLE "Match" ALTER COLUMN "organization2" TYPE "Organization_new" USING ("organization2"::text::"Organization_new");
ALTER TABLE "GroupMembership" ALTER COLUMN "organization" TYPE "Organization_new" USING ("organization"::text::"Organization_new");
ALTER TYPE "Organization" RENAME TO "Organization_old";
ALTER TYPE "Organization_new" RENAME TO "Organization";
DROP TYPE "Organization_old";
COMMIT;
