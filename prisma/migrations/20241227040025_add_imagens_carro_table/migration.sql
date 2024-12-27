-- CreateTable
CREATE TABLE "ImagensCarro" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImagensCarro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ImagensCarro_public_id_idx" ON "ImagensCarro"("public_id");

-- AddForeignKey
ALTER TABLE "ImagensCarro" ADD CONSTRAINT "ImagensCarro_public_id_fkey" FOREIGN KEY ("public_id") REFERENCES "Carro"("public_id") ON DELETE CASCADE ON UPDATE CASCADE;
