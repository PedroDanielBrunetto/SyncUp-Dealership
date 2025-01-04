"use client";

import ImageInputProps from "@/app/_components/ImageInputProps";
import { updateHighlightAsync } from "@/app/admin/_actions/updateHighlight";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AdminUpdateHighlight = () => {
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState<{
    fileName: string;
    file: File | null;
    contentType: string;
  }>({ fileName: "", file: null, contentType: "" });
  const [formData, setFormData] = useState({
    id: 1,
    titulo: "",
    descricao: "",
  });

  const handleImageUpload = (
    file: File | null,
    filename: string,
    contentType: string
  ) => {
    setImageData({
      fileName: filename,
      file: file,
      contentType: contentType,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    let sanitizedValue = value;

    if (["titulo", "descricao"].includes(id)) {
      // Remove aspas simples e outros caracteres problemáticos
      sanitizedValue = sanitizedValue.replace(/['"]/g, "");
    }

    setFormData((prev) => ({ ...prev, [id]: sanitizedValue }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await updateHighlightAsync({
        id: formData.id,
        titulo: formData.titulo,
        descricao: formData.descricao,
        file: imageData.file,
        fileName: imageData.fileName,
        contentType: imageData.contentType,
      });

      toast(response.status ? "Sucesso!" : "Erro", {
        description: response.status
          ? "Destaque Semanal atualizado com sucesso!"
          : "Tente novamente.",
        action: {
          label: <X />,
          onClick: () => console.log("SyncUp Brasil. www.syncupbrasil.tech"),
        },
      });
      if (!response.status) console.error(response.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setFormData({
        id: 1,
        titulo: "",
        descricao: "",
      });
    }
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
              onChange={handleChange}
              value={formData.titulo}
              id="titulo"
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
              onChange={handleChange}
              value={formData.descricao}
              id="descricao"
            />
            <p className="text-sm text-muted-foreground">
              Máximo de 240 carácteres. Altere o texto acima que está sendo
              exibido na Seção Destaque Semanal.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            <strong>Dica:</strong> Coloque uma imagem FHD (1920x1080)
          </p>
          <Button
            type="submit"
            className="w-44 flex items-center justify-center"
            disabled={
              loading || formData.titulo == "" || formData.descricao == ""
            }
            onClick={handleSubmit}
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
