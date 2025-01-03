"use server";

import { db } from "@/lib/prisma";
import { IFiltersFieldsEstoquePayload } from "@/utils/interfaces/IFiltersFieldsEstoquePayload";
import { Decimal } from "@prisma/client/runtime/library";

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

    let items = null;
    const data = await db.carro.findMany({
      where: whereClause,
    });
    items = data.map((item) => ({
      ...item,
      valor:
        item.valor instanceof Decimal
          ? item.valor
              .toNumber()
              .toFixed(2)
              .replace(".", ",")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".") // Adiciona pontos como separadores de milhar
          : item.valor,
    }));

    return {
      status: true,
      items: items,
      message:
        items.length > 0 ? "" : "Não possui veículos com essa descrição.",
    };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
};
