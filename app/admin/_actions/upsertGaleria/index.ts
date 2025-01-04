"use server";

import { db } from "@/lib/prisma";
import { S3StorageProvider } from "@/providers/aws/s3/S3StorageProvider";
import { convertFileToBuffer } from "@/utils/functions/convertFileToBuffer";
import path from "path";

interface IInsertGaleria {
  fileName: string;
  file: File | null;
  contentType: string;
  public_id: string;
}

export const insertFileGaleriaAsync = async (payload: IInsertGaleria) => {
  try {
    const s3 = new S3StorageProvider();
    const fileBuffer = await convertFileToBuffer(payload.file);

    const fileKey = `estoque/galeria/${payload.public_id}/${payload.fileName}`;

    let newImageUrl: string = "";
    if (payload.file != null)
      newImageUrl = await s3.saveFile(fileKey, fileBuffer, payload.contentType);

    await db.imagensCarro.create({
      data: {
        url: newImageUrl,
        public_id: payload.public_id,
      },
    });

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
