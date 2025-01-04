"use client";

import ImageInput from "@/app/_components/ImageInputProps";
import {
  deleteFileGaleriaAsync,
  insertFileGaleriaAsync,
} from "@/app/admin/_actions/upsertGaleria";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PenBox, Trash } from "lucide-react";
import { useState } from "react";

interface IImageExisted {
  id: number;
  public_id: string;
  createdAt: Date;
  url: string;
}

interface IGaleriaFormProps {
  imagesExisted?: IImageExisted[];
  public_id: string;
}

interface ImageData {
  fileName: string;
  file: File | null;
  contentType: string;
}

export default function GaleriaForm({
  imagesExisted,
  public_id,
}: IGaleriaFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imageData, setImageData] = useState<ImageData[]>(
    Array.from({ length: 10 - (imagesExisted?.length || 0) }, () => ({
      fileName: "",
      file: null,
      contentType: "",
    }))
  );

  const handleImageUpload = (
    index: number,
    file: File | null,
    filename: string,
    contentType: string
  ) => {
    setImageData((prev) =>
      prev.map((item, i) =>
        i === index
          ? { fileName: filename, file: file, contentType: contentType }
          : item
      )
    );
  };

  const handleCreateImage = async () => {
    try {
      setLoading(true);

      if (!imageData.every((img) => img.file === null)) {
        // Aguarda todas as promessas
        await Promise.all(
          imageData.map(async (req) => {
            if (req.file) {
              await insertFileGaleriaAsync(req, public_id);
            }
          })
        );

        setMessage("Imagens salvas com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setMessage("A Galeria deve ter pelo menos 1 imagem.");
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage("");
      }, 1500);
    }
  };

  return (
    <main className="flex flex-col gap-8">
      {imagesExisted && imagesExisted.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {imagesExisted.map((image, index) => (
            <div key={index} className="flex flex-col gap-2">
              <img
                src={image.url}
                className="object-cover h-full w-full rounded-lg lg:h-[460px]"
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={"destructive"}>
                    Remover Imagem <Trash />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Essa ação não pode ser desfeita.
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Você tem certeza que deseja remover essa imagem da
                      galeria? <br />
                      ID: {image.id}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        await deleteFileGaleriaAsync(image.id);
                        window.location.reload();
                      }}
                    >
                      Continuar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {imageData.map((_, index) => (
          <ImageInput
            key={index}
            onImageChange={(file, filename, contentType) =>
              handleImageUpload(index, file, filename, contentType)
            }
          />
        ))}
      </div>
      <span className="text-muted-foreground">{message}</span>
      <div>
        <Button onClick={handleCreateImage} disabled={loading}>
          {loading ? (
            <>
              <span className="mr-2 loader"></span> Atualizando...
            </>
          ) : (
            <>
              Atualizar Galeria <PenBox />
            </>
          )}
        </Button>
      </div>
    </main>
  );
}
