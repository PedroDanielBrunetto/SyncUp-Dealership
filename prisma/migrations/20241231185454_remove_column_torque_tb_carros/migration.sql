/*
  Warnings:

  - You are about to drop the column `torque` on the `Carro` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Carro" DROP COLUMN "torque",
ALTER COLUMN "detalhes" DROP NOT NULL,
ALTER COLUMN "lugares" DROP NOT NULL,
ALTER COLUMN "velocidades" DROP NOT NULL,
ALTER COLUMN "blindagem" DROP NOT NULL,
ALTER COLUMN "tipoBlindagem" DROP NOT NULL,
ALTER COLUMN "tracao" DROP NOT NULL,
ALTER COLUMN "portaMalas" DROP NOT NULL,
ALTER COLUMN "cavalos" DROP NOT NULL,
ALTER COLUMN "bancos" DROP NOT NULL,
ALTER COLUMN "velocidadeMax" DROP NOT NULL,
ALTER COLUMN "pesoVeiculo" DROP NOT NULL,
ALTER COLUMN "capacidadeTanque" DROP NOT NULL;
