"use server";

import { db } from "@/lib/prisma";
import { z } from "zod";

const emailSchema = z.string().email();

export const insertClientEmailAsync = async (
  email: string
): Promise<string> => {
  try {
    if (!emailSchema.safeParse(email).success) throw new Error("Invalid email");

    await db.contatePorEmail_Cliente.create({
      data: {
        email,
      },
    });

    return "Enviado com sucesso! Entraremos em contato.";
  } catch (error) {
    console.error("Erro ao inserir no banco:", error);
    return "Desculpe, algo deu errado. Ligue para o suporte.";
  }
};
