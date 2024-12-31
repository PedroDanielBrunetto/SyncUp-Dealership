/*
  Warnings:

  - Added the required column `capacidadeTanque` to the `Carro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoModelo` to the `Carro` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoModelo" AS ENUM ('SEDAN', 'HATCHBACK', 'SUV', 'COUPE', 'VAN', 'MINIVAN', 'OFFROAD', 'MICROCAR', 'PICKUP', 'ESPORTIVO');

-- AlterTable
ALTER TABLE "Carro" ADD COLUMN     "capacidadeTanque" INTEGER NOT NULL,
ADD COLUMN     "tipoModelo" "TipoModelo" NOT NULL;
