"use client";

import ImageInputProps from "@/app/_components/ImageInputProps";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AdminUpdateHighlight = () => {
  const handleImageUpload = (file: File, filename: string) => {
    console.log("Arquivo:", file);
    console.log("Nome do arquivo com hash:", filename);
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
        <div className="lg:h-[460px] h-64 w-full flex flex-col gap-8 lg:w-2/5">
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
        </div>
      </div>
    </main>
  );
};

export default AdminUpdateHighlight;
