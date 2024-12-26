"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface IReq {
  id: number;
  sobreNos: string;
  missao: string;
  visao: string;
  localizacao: string;
  user: string;
}

export const updateSobreAsync = async ({
  id,
  sobreNos,
  missao,
  visao,
  localizacao,
  user,
}: IReq) => {
  try {
    await db.sobre.update({
      data: {
        sobreNos,
        missao,
        visao,
        localizacao,
        updatedBy: user,
      },
      where: {
        id,
      },
    });

    revalidatePath("/admin/config/sobre");

    return {
      status: true,
      message: "Página sobre atualizada com sucesso!",
    };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
};
