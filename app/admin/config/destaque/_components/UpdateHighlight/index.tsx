"use client";

import ImageInputProps from "@/app/_components/ImageInputProps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const AdminUpdateHighlight = () => {
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState<{
    fileName: string;
    file: File | null;
  }>({ fileName: "", file: null });

  const handleImageUpload = (file: File, filename: string) => {
    setImageData({
      fileName: filename,
      file: file,
    });
  };

  return (
    <main className="flex flex-col gap-4 p-4">
      <div className="text-xl font-semibold">
        <h1>Atualizar:</h1>
      </div>
      <div className="flex lg:flex-row flex-col justify-between items-center gap-4">
        <div className="lg:h-[460px] w-full lg:w-auto">
          <ImageInputProps key={1} onImageChange={handleImageUpload} />
        </div>
        <div className="lg:h-[460px] w-full flex flex-col gap-8 lg:w-2/5">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="missaoForm">Título</Label>
            <Input
              placeholder="Escreva o título aqui."
              maxLength={25}
              id="titleForm"
            />
            <p className="text-sm text-muted-foreground">
              Máximo de 25 carácteres. Altere o texto acima que está sendo
              exibido na Seção Destaque Semanal.
            </p>
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="missaoForm">Descrição</Label>
            <Textarea
              placeholder="Escreva sua mensagem aqui."
              maxLength={240}
              id="descriptionForm"
            />
            <p className="text-sm text-muted-foreground">
              Máximo de 240 carácteres. Altere o texto acima que está sendo
              exibido na Seção Destaque Semanal.
            </p>
          </div>
          <Button
            type="submit"
            className="w-44 flex items-center justify-center"
            disabled={loading}
            onClick={() => console.log("click")}
          >
            {loading ? (
              <>
                <span className="mr-2 loader"></span> Salvando
              </>
            ) : (
              <>Salvar</>
            )}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default AdminUpdateHighlight;
