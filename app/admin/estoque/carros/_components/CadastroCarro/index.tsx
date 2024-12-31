"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import carBrandsData from "@/utils/carBrands.json";
import {
  combustiveis,
  Tracao,
  transmissoes,
} from "@/utils/constants/CadastroCarroForm";
import { formatCurrency } from "@/utils/functions/formatCurrency";

const schema = z.object({
  modelo: z.string().min(1, "Modelo é obrigatório"),
  versao: z.string().min(1, "Versão é obrigatória"),
  marca: z.string().min(1, "Marca é obrigatória"),
  valor: z.coerce.number().min(0, "Valor inválido"),
  anoFab: z.number().min(1900, "Ano inválido").max(new Date().getFullYear()),
  anoMod: z.number().min(1900, "Ano inválido").max(new Date().getFullYear()),
  hodometro: z.number().nonnegative("Hodômetro inválido"),
  detalhes: z.string(),
  portas: z.number().min(1).max(7),
  lugares: z.number().min(1).max(16),
  placa: z.string().min(1, "Placa é obrigatória"),
  combustivel: z.string().min(1, "Combustível é obrigatório"),
  transmissao: z.string().min(1, "Transmissão é obrigatória"),
  velocidades: z.number().min(1).max(16),
  arCondicionado: z.boolean(),
  blindagem: z.boolean(),
  tipoBlindagem: z.string(),
  tracao: z.string(),
  portaMalas: z.number().min(1, "Capacidade do porta-malas é obrigatória"),
  cavalos: z.number(),
  pesoVeiculo: z.number(),
  cor: z.string().min(1, "Cor é obrigatória"),
  bancos: z.string().min(1, "Bancos são obrigatórios"),
  torque: z.number(),
  velocidadeMax: z.number(),
});

export default function CadastroVeiculoForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
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
    },
  });

  const onSubmit = (data: any) => {
    console.log("Dados enviados:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Input
          placeholder="Modelo"
          {...register("modelo")}
          className={errors.modelo && "border-red-500"}
        />
        {errors.modelo && (
          <span className="text-red-500 text-sm">{errors.modelo.message}</span>
        )}
      </div>

      <div className="space-y-2">
        <Input
          placeholder="Versão"
          {...register("versao")}
          className={errors.versao && "border-red-500"}
        />
        {errors.versao && (
          <span className="text-red-500 text-sm">{errors.versao.message}</span>
        )}
      </div>

      <div className="space-y-2">
        <Select onValueChange={(value) => setValue("marca", value)}>
          <SelectTrigger className={errors.marca && "border-red-500"}>
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
        {errors.marca && (
          <span className="text-red-500 text-sm">{errors.marca.message}</span>
        )}
      </div>

      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Valor"
          {...register("valor", {
            onChange: (e) => {
              const formattedValue = formatCurrency(e.target.value);
              e.target.value = formattedValue;
              setValue("valor", formattedValue);
            },
          })}
          className={`form-input ${errors.valor ? "border-red-500" : ""}`}
        />
        {errors.valor && (
          <span className="text-red-500 text-sm">{errors.valor.message}</span>
        )}
      </div>

      <div className="space-y-2">
        <Input
          type="number"
          placeholder="Ano de Fabricação"
          {...register("anoFab")}
          className={errors.anoFab && "border-red-500"}
        />
        {errors.anoFab && (
          <span className="text-red-500 text-sm">{errors.anoFab.message}</span>
        )}
      </div>

      <div className="space-y-2">
        <Input
          type="number"
          placeholder="Ano do Modelo"
          {...register("anoMod")}
          className={errors.anoMod && "border-red-500"}
        />
        {errors.anoMod && (
          <span className="text-red-500 text-sm">{errors.anoMod.message}</span>
        )}
      </div>

      <div className="space-y-2">
        <Input
          type="number"
          placeholder="Hodômetro"
          {...register("hodometro")}
          className={errors.hodometro && "border-red-500"}
        />
        {errors.hodometro && (
          <span className="text-red-500 text-sm">
            {errors.hodometro.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Select onValueChange={(value) => setValue("combustivel", value)}>
          <SelectTrigger className={errors.combustivel && "border-red-500"}>
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
        {errors.combustivel && (
          <span className="text-red-500 text-sm">
            {errors.combustivel.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Select onValueChange={(value) => setValue("transmissao", value)}>
          <SelectTrigger className={errors.transmissao && "border-red-500"}>
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
        {errors.transmissao && (
          <span className="text-red-500 text-sm">
            {errors.transmissao.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Select onValueChange={(value) => setValue("tracao", value)}>
          <SelectTrigger className={errors.tracao && "border-red-500"}>
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
        {errors.tracao && (
          <span className="text-red-500 text-sm">{errors.tracao.message}</span>
        )}
      </div>

      <Button type="submit">Cadastrar</Button>
    </form>
  );
}
