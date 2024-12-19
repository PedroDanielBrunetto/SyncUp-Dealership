-- CreateTable
CREATE TABLE "VeiculoAnuncio_Cliente" (
    "id" TEXT NOT NULL,
    "marca" VARCHAR(120) NOT NULL,
    "modelo" VARCHAR(120) NOT NULL,
    "versao" VARCHAR(120) NOT NULL,
    "km" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "numero" VARCHAR(15) NOT NULL,

    CONSTRAINT "VeiculoAnuncio_Cliente_pkey" PRIMARY KEY ("id")
);
