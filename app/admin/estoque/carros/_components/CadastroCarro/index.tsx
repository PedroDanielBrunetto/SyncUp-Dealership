"use client";

import { useState } from "react";
import { ArrowRight, PenBox } from "lucide-react";
import ImageInputProps from "@/app/_components/ImageInputProps";
import { upsertCarroAsync } from "@/app/admin/_actions/upsertCarro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { generateCadastroCarroPayload } from "@/utils/functions/generateCadastroCarroPayload";
import { verifyCadastroCarroFields } from "@/utils/functions/verifyCadastroCarroFields";
import { formatCurrency } from "@/utils/functions/formatCurrency";
import { ICadastroCarroPayload } from "@/utils/interfaces/ICadastroCarroPayload";
import carBrandsData from "@/utils/carBrands.json";
import {
  combustiveis,
  transmissoes,
  StatusVenda,
  TipoBlindagem,
  TipoModelo,
  Tracao,
} from "@/utils/constants/CadastroCarroForm";
import { IAdminCadastroCarroFormProps } from "@/utils/interfaces/IAdminCadastroCarroFormProps";

export default function CadastroVeiculoForm(
  props?: IAdminCadastroCarroFormProps
) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [otherBrand, setOtherBrand] = useState(props?.att ? true : false);
  const [formData, setFormData] = useState({
    modelo: props?.modelo ?? "",
    tipoModelo: props?.tipoModelo ?? "",
    versao: props?.versao ?? "",
    marca: props?.marca ?? "",
    valor: props?.valor ?? "",
    anoFab: props?.anoFab ?? "",
    anoMod: props?.anoMod ?? "",
    hodometro: props?.hodometro ?? "",
    detalhes: props?.detalhes ?? "",
    portas: props?.portas ?? "",
    lugares: props?.lugares ?? "",
    placa: props?.placa ?? "",
    combustivel: props?.combustivel ?? "",
    transmissao: props?.transmissao ?? "",
    velocidades: props?.velocidades ?? "",
    arCondicionado: props?.arCondicionado ?? false,
    blindagem: props?.blindagem ?? false,
    tipoBlindagem: props?.tipoBlindagem ?? "",
    tracao: props?.tracao ?? "",
    portaMalas: props?.portaMalas ?? "",
    cavalos: props?.cavalos ?? "",
    pesoVeiculo: props?.pesoVeiculo ?? "",
    cor: props?.cor ?? "",
    bancos: props?.bancos ?? "",
    velocidadeMax: props?.velocidadeMax ?? "",
    capacidadeTanque: props?.capacidadeTanque ?? "",
    status: props?.status ?? "",
  });
  const [imageData, setImageData] = useState<{
    fileName: string;
    file: File | null;
    contentType: string;
  }>({ fileName: "", file: null, contentType: "" });

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
    if (name == "brand") setOtherBrand(checked);
    else
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: ICadastroCarroPayload =
      generateCadastroCarroPayload(formData);

    const verifyFields = verifyCadastroCarroFields(
      payload,
      imageData.file,
      props?.att == undefined ? false : true
    );
    if (verifyFields != true) {
      setMessage(verifyFields);
      return;
    }

    try {
      setLoading(true);
      const response = await upsertCarroAsync(
        payload,
        imageData,
        props?.public_id
      );

      if (response.status)
        window.location.replace(
          "/admin/estoque/carros/cadastro/" + response.uuid
        );

      setMessage(response.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <section className="grid lg:grid-cols-2 grid-cols-1 gap-2">
        {/* Modelo */}
        <div>
          <Label className="text-muted-foreground">Modelo</Label>
          <Input
            name="modelo"
            placeholder="Modelo"
            value={formData.modelo}
            onChange={handleChange}
            maxLength={60}
          />
        </div>
        {/* Tipo Modelo */}
        <div>
          <Label className="text-muted-foreground">Tipo de Modelo</Label>
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
        </div>
      </section>
      <section className="grid lg:grid-cols-2 grid-cols-1 gap-2">
        {/* Versão */}
        <div>
          <Label className="text-muted-foreground">Versão</Label>
          <Input
            name="versao"
            placeholder="Versão"
            value={formData.versao}
            onChange={handleChange}
            maxLength={120}
          />
        </div>
        {/* Marca */}
        <div>
          <Label className="text-muted-foreground">Marca</Label>
          {!otherBrand ? (
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
          ) : (
            <Input
              name="marca"
              placeholder="Escreva a Marca"
              value={formData.marca}
              onChange={handleChange}
              maxLength={120}
            />
          )}
          <div className="flex items-center gap-1 pt-2">
            <Label className="text-muted-foreground">Escrever a Marca</Label>
            <Switch
              checked={otherBrand}
              onCheckedChange={handleSwitchChange("brand")}
            />
          </div>
        </div>
      </section>
      <section className="grid lg:grid-cols-2 grid-cols-1 gap-2">
        {/* Valor */}
        <div>
          <Label className="text-muted-foreground">Valor</Label>
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
        </div>
        {/* Ano Fabricação */}
        <div>
          <Label className="text-muted-foreground">Ano de Fabricação</Label>
          <Input
            type="number"
            name="anoFab"
            placeholder="Ano de Fabricação"
            value={formData.anoFab}
            onChange={handleChange}
            min={0}
            max={3000}
          />
        </div>
      </section>
      <section className="grid lg:grid-cols-2 grid-cols-1 gap-2">
        {/* Ano Modelo */}
        <div>
          <Label className="text-muted-foreground">Ano do Modelo</Label>
          <Input
            type="number"
            name="anoMod"
            placeholder="Ano do Modelo"
            value={formData.anoMod}
            onChange={handleChange}
            min={0}
            max={3000}
          />
        </div>
        {/* Hodômetro */}
        <div>
          <Label className="text-muted-foreground">Hodômetro</Label>
          <Input
            type="number"
            name="hodometro"
            placeholder="Hodômetro"
            value={formData.hodometro}
            onChange={handleChange}
            min={0}
            max={9999999}
          />
        </div>
      </section>
      <section className="grid lg:grid-cols-2 grid-cols-1 gap-2">
        {/* Detalhes */}
        <div>
          <Label className="text-muted-foreground">Detalhes</Label>
          <Textarea
            name="detalhes"
            placeholder="Detalhes que deseja informar, podendo escrever sobre o veículo ou colocar sua ficha técnica."
            value={formData.detalhes}
            onChange={handleChange}
          />
        </div>
        {/* Número de Portas */}
        <div>
          <Label className="text-muted-foreground">Número de Portas</Label>
          <Input
            type="number"
            name="portas"
            placeholder="Número de Portas"
            value={formData.portas}
            onChange={handleChange}
          />
        </div>
      </section>
      <section className="grid lg:grid-cols-2 grid-cols-1 gap-2">
        {/* Número de Lugares */}
        <div>
          <Label className="text-muted-foreground">Número de Lugares</Label>
          <Input
            type="number"
            name="lugares"
            placeholder="Número de Lugares"
            value={formData.lugares}
            onChange={handleChange}
          />
        </div>
        {/* Placa */}
        <div>
          <Label className="text-muted-foreground">Placa</Label>
          <Input
            name="placa"
            placeholder="Placa"
            value={formData.placa}
            onChange={handleChange}
            maxLength={10}
          />
        </div>
      </section>
      <section className="grid lg:grid-cols-2 grid-cols-1 gap-2">
        {/* Tipo Combustível */}
        <div>
          <Label className="text-muted-foreground">Tipo de Combustível</Label>
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
        </div>
        {/* Tipo Transmissão */}
        <div>
          <Label className="text-muted-foreground">Tipo de Transmissão</Label>
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
        </div>
      </section>
      <section className="grid lg:grid-cols-2 grid-cols-1 gap-2">
        {/* Número de Velocidades */}
        <div>
          <Label className="text-muted-foreground">
            Número de Velocidades do Veículo
          </Label>
          <Input
            type="number"
            name="velocidades"
            placeholder="Número de Velocidades do Veículo"
            value={formData.velocidades}
            onChange={handleChange}
          />
        </div>
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
      </section>
      <section className="grid lg:grid-cols-2 grid-cols-1 gap-2">
        {/* Tipo Tração */}
        <div>
          <Label className="text-muted-foreground">Tipo de Tração</Label>
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
        </div>
        {/* Capacidade do Porta Malas */}
        <div>
          <Label className="text-muted-foreground">
            Capacidade do Porta Malas em Litros
          </Label>
          <Input
            type="number"
            name="portaMalas"
            placeholder="Capacidade do Porta Malas em Litros"
            value={formData.portaMalas}
            onChange={handleChange}
          />
        </div>
      </section>
      <section className="grid lg:grid-cols-2 grid-cols-1 gap-2">
        {/* Capacidade do Tanque */}
        <div>
          <Label className="text-muted-foreground">
            Capacidade do Tanque em Litros
          </Label>
          <Input
            type="number"
            name="capacidadeTanque"
            placeholder="Capacidade do Tanque em Litros"
            value={formData.capacidadeTanque}
            onChange={handleChange}
          />
        </div>
        {/* Peso do Veículo */}
        <div>
          <Label className="text-muted-foreground">Peso do Veículo em KG</Label>
          <Input
            type="number"
            name="pesoVeiculo"
            placeholder="Peso do Veículo em KG"
            value={formData.pesoVeiculo}
            onChange={handleChange}
          />
        </div>
      </section>
      <section className="grid lg:grid-cols-2 grid-cols-1 gap-2">
        {/* Cor do Veículo */}
        <div>
          <Label className="text-muted-foreground">Cor do Veículo</Label>
          <Input
            name="cor"
            placeholder="Cor do Veículo"
            value={formData.cor}
            onChange={handleChange}
            maxLength={60}
          />
        </div>
        {/* Bancos do Veículo */}
        <div>
          <Label className="text-muted-foreground">
            Detalhe os Bancos do Veículo
          </Label>
          <Input
            name="bancos"
            placeholder="Detalhe os bancos do veículo"
            value={formData.bancos}
            onChange={handleChange}
            maxLength={60}
          />
        </div>
      </section>
      <section className="grid lg:grid-cols-2 grid-cols-1 gap-2">
        {/* Cavalos */}
        <div>
          <Label className="text-muted-foreground">Potência em Cavalos</Label>
          <Input
            type="number"
            name="cavalos"
            placeholder="Potência em Cavalos"
            value={formData.cavalos}
            onChange={handleChange}
          />
        </div>
        {/* Velocidade Máxima */}
        <div>
          <Label className="text-muted-foreground">
            Velocidade Máxima do Veículo em KM/H
          </Label>
          <Input
            type="number"
            name="velocidadeMax"
            placeholder="Velocidade Máxima do Veículo em KM/H"
            value={formData.velocidadeMax}
            onChange={handleChange}
          />
        </div>
      </section>
      {/* Status Venda */}
      <div>
        <Label className="text-muted-foreground">Status da Venda</Label>
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
      </div>
      {/* Avatar */}
      <div className="xl:w-2/4 flex flex-col gap-3">
        <Label className="text-muted-foreground">Imagem principal</Label>
        <ImageInputProps key={1} onImageChange={handleImageUpload} />
      </div>
      <div className="pt-2">
        <span className="text-muted-foreground">{message}</span>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? (
          <>
            <span className="mr-2 loader"></span> Redirecionando...
          </>
        ) : props?.att ? (
          <>
            Atualizar Veículo <PenBox className="ml-2" />
          </>
        ) : (
          <>
            Criar Veículo <ArrowRight className="ml-2" />
          </>
        )}
      </Button>{" "}
    </form>
  );
}
