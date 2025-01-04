"use server";

import { db } from "@/lib/prisma";
import { S3StorageProvider } from "@/providers/aws/s3/S3StorageProvider";
import { convertFileToBuffer } from "@/utils/functions/convertFileToBuffer";
import { revalidatePath } from "next/cache";
import path from "path";

interface IInsertGaleria {
  fileName: string;
  file: File | null;
  contentType: string;
}

export const insertFileGaleriaAsync = async (
  payload: IInsertGaleria,
  public_id: string
) => {
  try {
    if (payload.file == null) return;

    const s3 = new S3StorageProvider();
    const fileBuffer = await convertFileToBuffer(payload.file);

    const fileKey = `estoque/galeria/${public_id}/${payload.fileName}`;

    const newImageUrl = await s3.saveFile(
      fileKey,
      fileBuffer,
      payload.contentType
    );

    await db.imagensCarro.create({
      data: {
        url: newImageUrl,
        public_id: public_id,
      },
    });

    revalidatePath(`/admin/estoque/galeria/${public_id}`);

    return {
      status: true,
      message: "Imagem inserida com sucesso",
    };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
};

export const deleteFileGaleriaAsync = async (id: number) => {
  try {
    const s3 = new S3StorageProvider();
    const imagem = await db.imagensCarro.findUnique({
      where: {
        id,
      },
    });

    if (!imagem) throw new Error("Imagem não encontrada");

    const oldFileName = path.basename(imagem.url);
    await s3.deleteFile(`estoque/galeria/${imagem.public_id}/${oldFileName}`);

    await db.imagensCarro.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/admin/estoque/galeria/${imagem.public_id}`);

    return {
      status: true,
      message: "Imagem deletada com sucesso",
    };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
};
