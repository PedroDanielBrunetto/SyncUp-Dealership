/*
  Warnings:

  - Added the required column `updatedAt` to the `contato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `contato` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contato" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedBy" TEXT NOT NULL;
