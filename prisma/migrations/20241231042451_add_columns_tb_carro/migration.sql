/*
  Warnings:

  - Added the required column `arCondicionado` to the `Carro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pesoVeiculo` to the `Carro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carro" ADD COLUMN     "arCondicionado" BOOLEAN NOT NULL,
ADD COLUMN     "pesoVeiculo" INTEGER NOT NULL;
