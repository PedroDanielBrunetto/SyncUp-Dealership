"use server";

import { db } from "@/lib/prisma";
import { IFiltersFieldsEstoquePayload } from "@/utils/interfaces/IFiltersFieldsEstoquePayload";

export const filterAdminStockAsync = async (
  filters: IFiltersFieldsEstoquePayload
) => {
  try {
    const whereClause: any = {};

    if (filters.placa) whereClause.placa = filters.placa;

    if (filters.modelo)
      whereClause.modelo = { contains: filters.modelo, mode: "insensitive" };

    if (filters.tipoModelo) whereClause.tipoModelo = filters.tipoModelo;

    if (filters.arCondicionado !== undefined && filters.arCondicionado)
      whereClause.arCondicionado = filters.arCondicionado;
    if (filters.blindagem !== undefined && filters.blindagem)
      whereClause.blindagem = filters.blindagem;

    if (filters.anoDe) whereClause.anoFab = { gte: filters.anoDe };
    if (filters.anoAte)
      whereClause.anoFab = { ...whereClause.anoFab, lte: filters.anoAte };

    if (filters.valorDe) whereClause.valor = { gte: Number(filters.valorDe) };
    if (filters.valorAte)
      whereClause.valor = {
        ...whereClause.valor,
        lte: Number(filters.valorAte),
      };

    const items = await db.carro.findMany({
      where: whereClause,
    });

    return items;
  } catch (error) {
    console.error("Error in filterAdminStockAsync:", error);
    throw new Error("Failed to filter stock");
  }
};
