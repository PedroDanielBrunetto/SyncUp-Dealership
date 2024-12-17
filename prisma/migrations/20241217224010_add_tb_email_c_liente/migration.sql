-- CreateTable
CREATE TABLE "ContatePorEmail_Cliente" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContatePorEmail_Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContatePorEmail_Cliente_email_key" ON "ContatePorEmail_Cliente"("email");
