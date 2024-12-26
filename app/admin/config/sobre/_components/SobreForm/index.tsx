"use client";

import { updateSobreAsync } from "@/app/admin/_actions/updateSobre";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
  id: number;
  sobreNos: string;
  missao: string;
  visao: string;
  localizacao: string;
  user: string;
}

export default function AdminConfigSobreForm({
  id,
  sobreNos,
  missao,
  visao,
  localizacao,
  user,
}: IProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sobreNosForm: "",
    missaoForm: "",
    visaoForm: "",
    localizacaoForm: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    // Aplicando validações específicas para cada campo
    let sanitizedValue = value;

    if (["sobreNosForm", "missaoForm", "visaoForm"].includes(id)) {
      // Remove aspas simples e outros caracteres problemáticos
      sanitizedValue = sanitizedValue.replace(/['"]/g, "");
    }

    setFormData((prev) => ({ ...prev, [id]: sanitizedValue }));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await updateSobreAsync({
        id,
        sobreNos: formData.sobreNosForm || sobreNos,
        missao: formData.missaoForm || missao,
        visao: formData.visaoForm || visao,
        localizacao: formData.localizacaoForm || localizacao,
        user,
      });

      toast(response.status ? "Sucesso!" : "Erro", {
        description: response.status
          ? "Página Sobre atualizada com sucesso!"
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
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="sobreNosForm">Sobre nós</Label>
        <Textarea
          placeholder="Escreva sua mensagem aqui."
          maxLength={780}
          id="sobreNosForm"
          onChange={handleChange}
          value={formData.sobreNosForm == "" ? sobreNos : formData.sobreNosForm}
        />
        <p className="text-sm text-muted-foreground">
          Máximo de 780 carácteres. Altere o texto acima que está sendo exibido
          na Página Sobre.
        </p>
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="missaoForm">Missão</Label>
        <Textarea
          placeholder="Escreva sua mensagem aqui."
          maxLength={120}
          id="missaoForm"
          onChange={handleChange}
          value={formData.missaoForm == "" ? missao : formData.missaoForm}
        />
        <p className="text-sm text-muted-foreground">
          Máximo de 120 carácteres. Altere o texto acima que está sendo exibido
          na Página Sobre.
        </p>
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="visaoForm">Visão</Label>
        <Textarea
          placeholder="Escreva sua mensagem aqui."
          maxLength={120}
          id="visaoForm"
          onChange={handleChange}
          value={formData.visaoForm == "" ? visao : formData.visaoForm}
        />
        <p className="text-sm text-muted-foreground">
          Máximo de 120 carácteres. Altere o texto acima que está sendo exibido
          na Página Sobre.
        </p>
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="localizacaoForm">Localização</Label>
        <Input
          placeholder="Coloque o link aqui."
          id="localizacaoForm"
          onChange={handleChange}
          value={
            formData.localizacaoForm == ""
              ? localizacao
              : formData.localizacaoForm
          }
        />
        <p className="text-sm text-muted-foreground">
          Para conseguir, vá na localização pelo Google Maps {">"} Compartilhar{" "}
          {">"} Incorporar um mapa {">"} Copiar o link que está dentro do "src"
        </p>
      </div>
      <Button
        type="submit"
        className="w-44 flex items-center justify-center"
        disabled={loading}
        onClick={handleUpdate}
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
  );
}
