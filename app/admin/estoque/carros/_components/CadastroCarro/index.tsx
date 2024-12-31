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
  StatusVenda,
  TipoBlindagem,
  TipoModelo,
  Tracao,
  transmissoes,
} from "@/utils/constants/CadastroCarroForm";
import { formatCurrency } from "@/utils/functions/formatCurrency";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function CadastroVeiculoForm() {
  const [formData, setFormData] = useState({
    modelo: "",
    tipoModelo: "",
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
    arCondicionado: false,
    blindagem: false,
    tipoBlindagem: "",
    tracao: "",
    portaMalas: "",
    cavalos: "",
    pesoVeiculo: "",
    cor: "",
    bancos: "",
    velocidadeMax: "",
    capacidadeTanque: "",
    status: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (name: string) => (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
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
      velocidades: parseInt(formData.velocidades, 10),
      portaMalas: parseInt(formData.portaMalas, 10),
      cavalos: parseInt(formData.cavalos, 10),
      pesoVeiculo: parseInt(formData.pesoVeiculo, 10),
      velocidadeMax: parseInt(formData.velocidadeMax, 10),
      capacidadeTanque: parseInt(formData.capacidadeTanque, 10),
    };
    console.log("Dados enviados:", payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Modelo */}
      <Input
        name="modelo"
        placeholder="Modelo"
        value={formData.modelo}
        onChange={handleChange}
        maxLength={60}
      />
      {/* Tipo Modelo */}
      <Select
        onValueChange={(value) => handleSelectChange("tipoModelo", value)}
        value={formData.tipoModelo}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione o tipo de modelo" />
        </SelectTrigger>
        <SelectContent>
          {TipoModelo.map((tp_model) => (
            <SelectItem key={tp_model.value} value={tp_model.value}>
              {tp_model.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Versão */}
      <Input
        name="versao"
        placeholder="Versão"
        value={formData.versao}
        onChange={handleChange}
        maxLength={120}
      />
      {/* Marca */}
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
      {/* Valor */}
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
      {/* Ano Fabricação */}
      <Input
        type="number"
        name="anoFab"
        placeholder="Ano de Fabricação"
        value={formData.anoFab}
        onChange={handleChange}
        min={0}
        max={3000}
      />
      {/* Ano Modelo */}
      <Input
        type="number"
        name="anoMod"
        placeholder="Ano do Modelo"
        value={formData.anoMod}
        onChange={handleChange}
        min={0}
        max={3000}
      />
      {/* Hodômetro */}
      <Input
        type="number"
        name="hodometro"
        placeholder="Hodômetro"
        value={formData.hodometro}
        onChange={handleChange}
        min={0}
        max={9999999}
      />
      {/* Detalhes */}
      <Textarea
        name="detalhes"
        placeholder="Detalhes que deseja informar, podendo escrever sobre o veículo ou colocar sua ficha técnica."
        value={formData.detalhes}
        onChange={handleChange}
      />
      {/* Número de Portas */}
      <Input
        type="number"
        name="portas"
        placeholder="Número de Portas"
        value={formData.portas}
        onChange={handleChange}
      />
      {/* Número de Lugares */}
      <Input
        type="number"
        name="lugares"
        placeholder="Número de Lugares"
        value={formData.lugares}
        onChange={handleChange}
      />
      {/* Placa */}
      <Input
        name="placa"
        placeholder="Placa"
        value={formData.placa}
        onChange={handleChange}
        maxLength={10}
      />
      {/* Tipo Combustível */}
      <Select
        onValueChange={(value) => handleSelectChange("combustivel", value)}
        value={formData.combustivel}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione o Tipo de Combustível" />
        </SelectTrigger>
        <SelectContent>
          {combustiveis.map((fuel) => (
            <SelectItem key={fuel.value} value={fuel.value}>
              {fuel.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Tipo Transmissão */}
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
      {/* Número de Velocidades */}
      <Input
        type="number"
        name="velocidades"
        placeholder="Número de Velocidades do Veículo"
        value={formData.velocidades}
        onChange={handleChange}
      />
      {/* Ar Condicionado; Blindagem; Tipo Blindagem */}
      <div className="flex gap-2 lg:flex-row flex-col">
        <div className="flex gap-1 items-center">
          <Label className="text-muted-foreground">Ar Condicionado</Label>
          <Switch
            checked={formData.arCondicionado}
            onCheckedChange={handleSwitchChange("arCondicionado")}
          />
        </div>
        <div className="flex gap-1 items-center">
          <Label className="text-muted-foreground">Blindagem</Label>
          <Switch
            checked={formData.blindagem}
            onCheckedChange={handleSwitchChange("blindagem")}
          />
        </div>
        <div>
          <Select
            onValueChange={(value) =>
              handleSelectChange("tipoBlindagem", value)
            }
            value={formData.tipoBlindagem}
            disabled={!formData.blindagem}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a Blindagem" />
            </SelectTrigger>
            <SelectContent>
              {TipoBlindagem.map((blin) => (
                <SelectItem key={blin.value} value={blin.value}>
                  {blin.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Tipo Tração */}
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
      {/* Capacidade do Porta Malas */}
      <Input
        type="number"
        name="portaMalas"
        placeholder="Capacidade do Porta Malas em Litros"
        value={formData.portaMalas}
        onChange={handleChange}
      />
      {/* Capacidade do Tanque */}
      <Input
        type="number"
        name="capacidadeTanque"
        placeholder="Capacidade do Tanque em Litros"
        value={formData.capacidadeTanque}
        onChange={handleChange}
      />
      {/* Peso do Veículo */}
      <Input
        type="number"
        name="pesoVeiculo"
        placeholder="Peso do Veículo em KG"
        value={formData.pesoVeiculo}
        onChange={handleChange}
      />
      {/* Cor do Veículo */}
      <Input
        name="cor"
        placeholder="Cor do Veículo"
        value={formData.cor}
        onChange={handleChange}
        maxLength={60}
      />
      {/* Bancos do Veículo */}
      <Input
        name="bancos"
        placeholder="Detalhe os bancos do veículo"
        value={formData.bancos}
        onChange={handleChange}
        maxLength={60}
      />
      {/* Cavalos */}
      <Input
        type="number"
        name="cavalos"
        placeholder="Potência em Cavalos"
        value={formData.cavalos}
        onChange={handleChange}
      />
      {/* Velocidade Máxima */}
      <Input
        type="number"
        name="velocidadeMax"
        placeholder="Velocidade Máxima do Veículo em KM/H"
        value={formData.velocidadeMax}
        onChange={handleChange}
      />
      {/* Status Venda */}
      <Select
        onValueChange={(value) => handleSelectChange("status", value)}
        value={formData.status}
      >
        <SelectTrigger>
          <SelectValue placeholder="Status da Venda" />
        </SelectTrigger>
        <SelectContent>
          {StatusVenda.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">Cadastrar</Button>
    </form>
  );
}
