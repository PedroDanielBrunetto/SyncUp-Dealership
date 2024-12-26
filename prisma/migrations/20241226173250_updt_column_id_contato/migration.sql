/*
  Warnings:

  - The primary key for the `contato` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `contato` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "contato" DROP CONSTRAINT "contato_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "contato_pkey" PRIMARY KEY ("id");
