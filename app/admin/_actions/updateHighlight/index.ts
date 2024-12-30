"use server";

import { db } from "@/lib/prisma";
import { S3StorageProvider } from "@/providers/aws/s3/S3StorageProvider";
import { convertFileToBuffer } from "@/utils/functions/convertFileToBuffer";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import path from "path";

interface IReq {
  id: number;
  fileName: string;
  file: File | null;
  titulo: string;
  descricao: string;
  contentType: string;
}

export const updateHighlightAsync = async ({
  id,
  fileName,
  file,
  titulo,
  descricao,
  contentType,
}: IReq) => {
  try {
    const s3 = new S3StorageProvider();
    const { firstName, lastName } = (await currentUser()) as any;

    const highlight = await db.destaqueSemanal.findUnique({
      where: { id },
    });

    if (!highlight) throw new Error("O Destaque não foi encontrado.");

    if (highlight.imageUrl) {
      const oldFileName = path.basename(highlight.imageUrl);
      await s3.deleteFile(`home/destaque/${oldFileName}`);
    }

    const fileBuffer = await convertFileToBuffer(file);

    const fileKey = `home/destaque/${fileName}`;
    const newImageUrl = await s3.saveFile(fileKey, fileBuffer, contentType);

    await db.destaqueSemanal.update({
      data: {
        titulo,
        descricao,
        updatedBy: `${firstName} ${lastName}`,
        imageUrl: newImageUrl,
      },
      where: {
        id,
      },
    });

    revalidatePath("/admin/config/destaque");

    return {
      status: true,
      message: "Destaque Semanal atualizado com sucesso.",
    };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
};
