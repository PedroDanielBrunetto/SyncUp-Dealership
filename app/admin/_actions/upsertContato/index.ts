"use server";

import { db } from "@/lib/prisma";
import { EnumContatos } from "@/utils/enums/contatos";
import { revalidatePath } from "next/cache";

interface IReq {
  id: number;
  valor: string;
  tipo: string;
  user: string;
}

export const upsertContatoAsync = async ({ id, valor, tipo, user }: IReq) => {
  try {
    const dataToUpdate: any = {};

    if (tipo === EnumContatos.Email) dataToUpdate.email = valor;
    else if (tipo === EnumContatos.Celular) dataToUpdate.celular = valor;
    else if (tipo === EnumContatos.WhatsApp) dataToUpdate.whatsAppUrl;
    else if (tipo === EnumContatos.Instagram) dataToUpdate.instagramUrl = valor;
    else if (tipo === EnumContatos.Facebook) dataToUpdate.facebookUrl = valor;
    else if (tipo === EnumContatos.YouTube) dataToUpdate.youtubeUrl = valor;

    await db.contato.update({
      data: { ...dataToUpdate, updatedBy: user },
      where: {
        id,
      },
    });

    revalidatePath("/admin/config/contato");

    return {
      status: true,
      message: "Contato atualizado com sucesso!",
    };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
};
