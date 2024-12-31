"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import carBrandsData from "@/utils/carBrands.json";
import {
  combustiveis,
  Tracao,
  transmissoes,
} from "@/utils/constants/CadastroCarroForm";
import { formatCurrency } from "@/utils/functions/formatCurrency";

export default function CadastroVeiculoForm() {
  const [formData, setFormData] = useState({
    modelo: "",
    versao: "",
    marca: "",
    valor: "",
    anoFab: "",
    anoMod: "",
    hodometro: "",
    detalhes: "",
    portas: "",
    lugares: "",
    placa: "",
    combustivel: "",
    transmissao: "",
    velocidades: "",
    arCondicionado: true,
    blindagem: false,
    tipoBlindagem: "",
    tracao: "",
    portaMalas: "",
    cavalos: "",
    pesoVeiculo: "",
    cor: "",
    bancos: "",
    torque: "",
    velocidadeMax: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" && (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      valor: parseFloat(
        formData.valor.replace(/[^\d,]/g, "").replace(",", ".")
      ),
      anoFab: parseInt(formData.anoFab, 10),
      anoMod: parseInt(formData.anoMod, 10),
      hodometro: parseInt(formData.hodometro, 10),
    };
    console.log("Dados enviados:", payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="modelo"
        placeholder="Modelo"
        value={formData.modelo}
        onChange={handleChange}
      />

      <Input
        name="versao"
        placeholder="Versão"
        value={formData.versao}
        onChange={handleChange}
      />

      <Select
        onValueChange={(value) => handleSelectChange("marca", value)}
        value={formData.marca}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione a Marca" />
        </SelectTrigger>
        <SelectContent>
          {carBrandsData.carBrands.map((brand) => (
            <SelectItem key={brand} value={brand}>
              {brand}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        name="valor"
        placeholder="Valor"
        value={formData.valor}
        onChange={(e) => {
          const rawValue = e.target.value.replace(/[^\d]/g, "");
          const formattedValue = formatCurrency(rawValue);
          setFormData((prev) => ({
            ...prev,
            valor: formattedValue,
          }));
        }}
      />

      <Input
        type="number"
        name="anoFab"
        placeholder="Ano de Fabricação"
        value={formData.anoFab}
        onChange={handleChange}
      />

      <Input
        type="number"
        name="anoMod"
        placeholder="Ano do Modelo"
        value={formData.anoMod}
        onChange={handleChange}
      />

      <Input
        type="number"
        name="hodometro"
        placeholder="Hodômetro"
        value={formData.hodometro}
        onChange={handleChange}
      />

      <Select
        onValueChange={(value) => handleSelectChange("combustivel", value)}
        value={formData.combustivel}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione o Combustível" />
        </SelectTrigger>
        <SelectContent>
          {combustiveis.map((fuel) => (
            <SelectItem key={fuel.value} value={fuel.value}>
              {fuel.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => handleSelectChange("transmissao", value)}
        value={formData.transmissao}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione a Transmissão" />
        </SelectTrigger>
        <SelectContent>
          {transmissoes.map((trans) => (
            <SelectItem key={trans.value} value={trans.value}>
              {trans.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => handleSelectChange("tracao", value)}
        value={formData.tracao}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione a Tração" />
        </SelectTrigger>
        <SelectContent>
          {Tracao.map((trac) => (
            <SelectItem key={trac.value} value={trac.value}>
              {trac.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button type="submit">Cadastrar</Button>
    </form>
  );
}
