-- CreateTable
CREATE TABLE "sobre" (
    "id" INTEGER NOT NULL,
    "sobreNos" TEXT NOT NULL,
    "missao" VARCHAR(120) NOT NULL,
    "visao" VARCHAR(120) NOT NULL,
    "localizacao" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "sobre_pkey" PRIMARY KEY ("id")
);
