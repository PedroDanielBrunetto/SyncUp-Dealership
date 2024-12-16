"use server";

import { db } from "@/lib/prisma";
import { insertSpecificModelSchema } from "./schema";

interface IReq {
  name: string;
  phone: string;
  email: string;
  model: string;
}

export const insertSpecificModelAsync = async (data: IReq): Promise<string> => {
  try {
    insertSpecificModelSchema.parse(data);
    await db.modeloEspecifico_Cliente.create({
      data: {
        email: data.email,
        modelo: data.model,
        nome: data.name,
        numero: data.phone,
      },
    });

    return "Enviado com sucesso! Entraremos em contato.";
  } catch (error) {
    console.error("Erro ao inserir no banco:", error); // Log do erro
    return "Desculpe, algo deu errado. Ligue para nosso número.";
  }
};
