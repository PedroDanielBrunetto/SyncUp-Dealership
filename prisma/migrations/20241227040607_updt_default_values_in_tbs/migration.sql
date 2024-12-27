/*
  Warnings:

  - You are about to drop the `contato` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sobre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "contato";

-- DropTable
DROP TABLE "sobre";

-- CreateTable
CREATE TABLE "Contato" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "email" TEXT NOT NULL DEFAULT 'contato@syncupbrasil.tech',
    "whatsAppUrl" TEXT NOT NULL DEFAULT 'api.whatsapp.com',
    "celular" VARCHAR(15) NOT NULL DEFAULT '13999999999',
    "instagramUrl" TEXT NOT NULL DEFAULT 'instagram.com/syncupbrasil',
    "facebookUrl" TEXT NOT NULL DEFAULT 'instagram.com/syncupbrasil',
    "youtubeUrl" TEXT NOT NULL DEFAULT 'instagram.com/syncupbrasil',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" TEXT NOT NULL DEFAULT 'SyncUp Brasil',

    CONSTRAINT "Contato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sobre" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "sobreNos" TEXT NOT NULL DEFAULT 'SyncUp Brasil',
    "missao" VARCHAR(120) NOT NULL DEFAULT 'SyncUp Brasil',
    "visao" VARCHAR(120) NOT NULL DEFAULT 'SyncUp Brasil',
    "localizacao" TEXT NOT NULL DEFAULT 'SyncUp Brasil',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" TEXT NOT NULL DEFAULT 'SyncUp Brasil',

    CONSTRAINT "Sobre_pkey" PRIMARY KEY ("id")
);

-- Inserir valores padrões na tabela Contato
INSERT INTO "Contato" (id, email, "whatsAppUrl", celular, "instagramUrl", "facebookUrl", "youtubeUrl", "updatedAt", "updatedBy")
VALUES (1, 'contato@syncupbrasil.tech', 'api.whatsapp.com', '13999999999', 'instagram.com/syncupbrasil', 'instagram.com/syncupbrasil', 'instagram.com/syncupbrasil', NOW(), 'SyncUp Brasil')
ON CONFLICT (id) DO NOTHING;

-- Inserir valores padrões na tabela Sobre
INSERT INTO "Sobre" (id, "sobreNos", missao, visao, localizacao, "updatedAt", "updatedBy")
VALUES (1, 'SyncUp Brasil', 'SyncUp Brasil', 'SyncUp Brasil', 'SyncUp Brasil', NOW(), 'SyncUp Brasil')
ON CONFLICT (id) DO NOTHING;
