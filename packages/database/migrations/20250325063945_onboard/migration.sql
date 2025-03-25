/*
  Warnings:

  - You are about to drop the column `onboarded` on the `session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "session" DROP COLUMN "onboarded";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "onboarded" BOOLEAN NOT NULL DEFAULT false;
