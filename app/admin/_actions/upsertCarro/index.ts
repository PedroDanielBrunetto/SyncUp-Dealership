"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { S3StorageProvider } from "@/providers/aws/s3/S3StorageProvider";
import { ICadastroCarroPayload } from "@/utils/interfaces/ICadastroCarroPayload";
import { convertFileToBuffer } from "@/utils/functions/convertFileToBuffer";
import { upsertCarroSchema } from "./schema";
import { ZodError } from "zod";
import path from "path";

interface IFile {
  file: File | null;
  fileName: string;
  contentType: string;
}

export const upsertCarroAsync = async (
  payload: ICadastroCarroPayload,
  pack: IFile,
  public_id?: string
) => {
  try {
    upsertCarroSchema.parse(payload);

    const s3 = new S3StorageProvider();
    const { firstName, lastName } = (await currentUser()) as any;

    const existingCar = await db.carro.findFirst({
      where: {
        OR: [{ public_id }, { placa: payload.placa }],
      },
    });

    if (!public_id && existingCar?.placa == payload.placa)
      throw new Error("Placa cadastrada em outro veículo.");

    if (pack.file && existingCar?.avatar) {
      const oldFileName = path.basename(existingCar.avatar);
      await s3.deleteFile(
        `estoque/avatar/${existingCar.public_id}/${oldFileName}`
      );
    }

    const car = await db.carro.upsert({
      update: {
        ...payload,
        updatedBy: `${firstName} ${lastName}`,
      },
      create: {
        ...payload,
        createdBy: `${firstName} ${lastName}`,
        updatedBy: `${firstName} ${lastName}`,
      },
      where: { public_id: public_id ?? "" },
    });

    if (pack.file) {
      const fileBuffer = await convertFileToBuffer(pack.file);
      const fileKey = `estoque/avatar/${car.public_id}/${pack.fileName}`;
      const updateImage = await s3.saveFile(
        fileKey,
        fileBuffer,
        pack.contentType
      );

      await db.carro.update({
        data: { avatar: updateImage },
        where: { public_id: car.public_id },
      });
    }

    return {
      status: true,
      message: "Carro salvo com sucesso",
      uuid: car.public_id,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: false,
        message: "Erro de validação",
        errors: error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      };
    }

    return {
      status: false,
      message: error instanceof Error ? error.message : "Erro inesperado",
    };
  }
};
