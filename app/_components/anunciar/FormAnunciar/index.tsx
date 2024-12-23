"use client";

import { createClientVehiclelAsync } from "@/app/_actions/createClientVehicle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const FormAnunciar = () => {
  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    versao: "",
    km: 0,
    ano: 0,
    valor: 0,
    nome: "",
    email: "",
    numero: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => {
      if (id === "km" || id === "ano") {
        const numericValue = value.replace(/\D/g, "");
        const maxLength = id === "km" ? 7 : 4;
        return {
          ...prev,
          [id]: parseInt(numericValue.slice(0, maxLength)) || 0,
        };
      }

      if (id === "valor") {
        const numericValue = value.replace(/\D/g, "");
        const formattedValue = (parseFloat(numericValue) / 100).toFixed(2);
        return { ...prev, [id]: parseFloat(formattedValue) || 0 };
      }

      return { ...prev, [id]: value };
    });
  };

  const handleSwitch = () => {
    setAgree((prev) => !prev);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!agree) {
        setMessage("Você deve concordar com a Política de Privacidade.");
        return;
      }

      const response = await createClientVehiclelAsync(formData);

      setMessage(response);
    } catch (error) {
      setMessage("Desculpe, algo deu errado. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
      setAgree(false);
      setFormData({
        marca: "",
        modelo: "",
        versao: "",
        km: 0,
        ano: 0,
        valor: 0,
        nome: "",
        email: "",
        numero: "",
      });
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  return (
    <section className="p-main p-4 lg:pt-32 pt-28">
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-3xl font-medium">Anuncie seu veículo</h1>
        <h2 className="text-sm">
          Preencha o formulário e realize seu anúncio! Nossa equipe entrará em
          contato com você o mais rápido.
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="pt-6">
        <div className="flex flex-col gap-8">
          {/* Dados do Veículo */}
          <div className="flex flex-col gap-6">
            <h1 className="font-medium -mb-4">Dados do veículo</h1>
            <div className="flex flex-col lg:flex-row justify-between lg:gap-36 gap-4">
              <Input
                type="text"
                placeholder="Marca"
                id="marca"
                value={formData.marca}
                onChange={handleChange}
                className="border-gray-400"
              />
              <Input
                type="text"
                placeholder="Modelo"
                id="modelo"
                value={formData.modelo}
                onChange={handleChange}
                className="border-gray-400"
              />
              <Input
                type="text"
                placeholder="Versão"
                id="versao"
                value={formData.versao}
                onChange={handleChange}
                className="border-gray-400"
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-between lg:gap-36 gap-4">
              <Input
                type="text"
                placeholder="KM do Veículo"
                id="km"
                value={formData.km === 0 ? "" : formData.km.toString()}
                onChange={handleChange}
                className="border-gray-400"
              />
              <Input
                type="text"
                placeholder="Ano do Veículo"
                id="ano"
                value={formData.ano === 0 ? "" : formData.ano.toString()}
                onChange={handleChange}
                className="border-gray-400"
              />
              <Input
                type="text"
                placeholder="Valor Desejado"
                id="valor"
                value={
                  formData.valor === 0 ? "" : formatCurrency(formData.valor)
                }
                onChange={handleChange}
                className="border-gray-400"
              />
            </div>
          </div>
          {/* Dados Pessoais */}
          <div className="flex flex-col gap-6">
            <h1 className="font-medium -mb-4">Dados pessoais</h1>
            <div className="flex flex-col lg:flex-row justify-between lg:gap-36 gap-4">
              <Input
                type="text"
                placeholder="Nome"
                id="nome"
                value={formData.nome}
                onChange={handleChange}
                className="border-gray-400"
              />
              <Input
                type="text"
                placeholder="Email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="border-gray-400"
              />
              <Input
                type="text"
                placeholder="Celular"
                id="numero"
                value={formData.numero}
                onChange={handleChange}
                className="border-gray-400"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex gap-2 items-center">
              <Switch checked={agree} onCheckedChange={handleSwitch} />
              <span className="text-gray-900 text-xs">
                De acordo com a LGPD, concordo em fornecer os dados acima para
                que a concessionária entre em contato comigo para apresentar
                serviços. Seu nome, e-mail e telefone serão usados de acordo com
                a nossa Política de Privacidade.
              </span>
            </div>
            <Button
              type="submit"
              className="w-44 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="mr-2 loader"></span> Enviando
                </>
              ) : (
                <>
                  Enviar <ArrowRight className="ml-2" />
                </>
              )}
            </Button>
          </div>
          <span className="text-black text-sm font-medium">{message}</span>
        </div>
      </form>
    </section>
  );
};

export default FormAnunciar;
