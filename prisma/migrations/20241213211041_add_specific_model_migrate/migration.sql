-- CreateTable
CREATE TABLE "ModeloEspecifico_Cliente" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "modelo" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "numero" VARCHAR(12) NOT NULL,

    CONSTRAINT "ModeloEspecifico_Cliente_pkey" PRIMARY KEY ("id")
);
