"use client";

import ImageInput from "@/app/_components/ImageInputProps";
import { Button } from "@/components/ui/button";
import { PenBox, Trash } from "lucide-react";
import { useState } from "react";

interface IImageExisted {
  idImageExisted?: number;
  imageExisted?: string;
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
  const [imageData, setImageData] = useState<ImageData[]>(
    Array.from({ length: 10 }, () => ({
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

  return (
    <main className="flex flex-col gap-8">
      {imagesExisted && imagesExisted.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {imagesExisted.map((image, index) => (
            <div key={index} className="flex flex-col gap-2">
              <img
                src={image.imageExisted}
                className="object-cover h-full w-full rounded-lg lg:h-[460px]"
              />
              <Button variant={"destructive"}>
                Remover Imagem <Trash />
              </Button>
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
      <div>
        <Button>
          Atualizar Galeria <PenBox />
        </Button>
      </div>
    </main>
  );
}
