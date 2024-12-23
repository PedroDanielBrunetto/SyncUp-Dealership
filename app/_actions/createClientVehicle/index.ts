"use server";

import { db } from "@/lib/prisma";
import { createClientVehicleSchema } from "./schema";
import { z } from "zod";

interface IReq {
  marca: string;
  modelo: string;
  versao: string;
  km: number;
  ano: number;
  valor: number;
  nome: string;
  email: string;
  numero: string;
}

export const createClientVehiclelAsync = async (
  data: IReq
): Promise<string> => {
  try {
    createClientVehicleSchema.parse(data);

    await db.veiculoAnuncio_Cliente.create({
      data,
    });

    return "Enviado com sucesso! Entraremos em contato.";
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((err) => err.message).join(", ");
      return `Erro de validação: ${errorMessage}`;
    }

    console.error("Erro ao inserir no banco:", error);
    return "Desculpe, algo deu errado. Ligue para nosso número.";
  }
};
