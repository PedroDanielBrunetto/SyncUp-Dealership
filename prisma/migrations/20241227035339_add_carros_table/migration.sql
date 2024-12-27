-- CreateEnum
CREATE TYPE "Combustivel" AS ENUM ('GASOLINA', 'ALCOOL', 'FLEX', 'DIESEL', 'ELETRICO', 'HIBRIDO', 'GNV');

-- CreateEnum
CREATE TYPE "Transmissao" AS ENUM ('MANUAL', 'AUTOMATICO', 'CVT', 'SEMI_AUTOMATICO', 'AUTOMATIZADO');

-- CreateEnum
CREATE TYPE "TipoBlindagem" AS ENUM ('LEVE', 'MEDIA', 'PESADA', 'NENHUMA');

-- CreateEnum
CREATE TYPE "Tracao" AS ENUM ('DIANTEIRA', 'TRASEIRA', 'INTEGRAL', 'QUATRO_POR_QUATRO');

-- CreateEnum
CREATE TYPE "StatusVenda" AS ENUM ('LIVRE', 'RESERVADO', 'NEGOCIANDO', 'VENDIDO', 'EM_FINANCIAMENTO', 'EM_TRANSFERENCIA', 'EM_ANALISE', 'EM_MANUTENCAO', 'CONTESTACAO', 'CANCELADO', 'DEVOLVIDO', 'RETIRADO');

-- CreateTable
CREATE TABLE "Carro" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "modelo" VARCHAR(60) NOT NULL,
    "versao" VARCHAR(120) NOT NULL,
    "marca" VARCHAR(30) NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "anoFab" INTEGER NOT NULL,
    "anoMod" INTEGER NOT NULL,
    "hodometro" INTEGER NOT NULL,
    "detalhes" TEXT NOT NULL,
    "portas" INTEGER NOT NULL,
    "lugares" INTEGER NOT NULL,
    "placa" VARCHAR(10) NOT NULL,
    "combustivel" "Combustivel" NOT NULL,
    "transmissao" "Transmissao" NOT NULL,
    "velocidades" INTEGER NOT NULL,
    "blindagem" BOOLEAN NOT NULL,
    "tipoBlindagem" "TipoBlindagem" NOT NULL,
    "tracao" "Tracao" NOT NULL,
    "portaMalas" INTEGER NOT NULL,
    "cavalos" INTEGER NOT NULL,
    "cor" VARCHAR(60) NOT NULL,
    "bancos" VARCHAR(60) NOT NULL,
    "torque" DOUBLE PRECISION NOT NULL,
    "velocidadeMax" INTEGER NOT NULL,
    "avatar" TEXT NOT NULL,
    "status" "StatusVenda" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" VARCHAR(120) NOT NULL,
    "updatedBy" VARCHAR(120) NOT NULL,

    CONSTRAINT "Carro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Carro_public_id_key" ON "Carro"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "Carro_placa_key" ON "Carro"("placa");

-- CreateIndex
CREATE INDEX "Carro_placa_idx" ON "Carro"("placa");

-- CreateIndex
CREATE INDEX "Carro_public_id_idx" ON "Carro"("public_id");
