-- CreateTable
CREATE TABLE "contato" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsAppUrl" TEXT NOT NULL,
    "celular" VARCHAR(15) NOT NULL,
    "instagramUrl" TEXT NOT NULL,
    "facebookUrl" TEXT NOT NULL,
    "youtubeUrl" TEXT NOT NULL,

    CONSTRAINT "contato_pkey" PRIMARY KEY ("id")
);
