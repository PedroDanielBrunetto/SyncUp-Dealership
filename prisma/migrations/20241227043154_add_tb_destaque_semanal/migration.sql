-- CreateTable
CREATE TABLE "DestaqueSemanal" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(30) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" VARCHAR(120) NOT NULL,

    CONSTRAINT "DestaqueSemanal_pkey" PRIMARY KEY ("id")
);
