"use client";

import { filterAdminStockAsync } from "@/app/admin/_actions/filterAdminStock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TipoModelo } from "@/utils/constants/CadastroCarroForm";
import { formatCurrency } from "@/utils/functions/formatCurrency";
import { generateFiltersFieldsEstoquePayload } from "@/utils/functions/generateFiltersFieldsEstoquePayload";
import { verifyFilterFieldsEstoque } from "@/utils/functions/verifyFilterFieldsEstoque";
import { IFiltersFieldsEstoquePayload } from "@/utils/interfaces/IFiltersFieldsEstoquePayload";
import { CheckCheck } from "lucide-react";
import { useState } from "react";

export default function ListEstoqueWithFiltersAdmin({ onChangeFilters }: any) {
  const [filters, setFilters] = useState({
    placa: "",
    modelo: "",
    tipoModelo: "",
    arCondicionado: false,
    blindagem: false,
    anoDe: "",
    anoAte: "",
    valorDe: "",
    valorAte: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (name: string) => (checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleFilter = async () => {
    const payload: IFiltersFieldsEstoquePayload =
      generateFiltersFieldsEstoquePayload(filters);

    const verifyFields = verifyFilterFieldsEstoque(payload);
    if (verifyFields != true) return;

    const res = await filterAdminStockAsync(payload);

    console.log(res);
  };

  return (
    <section>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 items-end">
        <div className="max-w-80">
          <Label className="text-muted-foreground">Placa</Label>
          <Input
            type="text"
            name="placa"
            placeholder="Procure pela placa..."
            value={filters.placa}
            onChange={handleChange}
            maxLength={10}
          />
        </div>
        <div className="max-w-80">
          <Label className="text-muted-foreground">Modelo</Label>
          <Input
            type="text"
            name="modelo"
            placeholder="Procure pelo Modelo..."
            value={filters.modelo}
            onChange={handleChange}
            maxLength={60}
          />
        </div>
        <div className="max-w-80">
          <Label className="text-muted-foreground">Ano de:</Label>
          <Input
            type="number"
            name="anoDe"
            placeholder="De..."
            value={filters.anoDe}
            onChange={handleChange}
          />
        </div>
        <div className="max-w-80">
          <Label className="text-muted-foreground">Ano até:</Label>
          <Input
            type="number"
            name="anoAte"
            placeholder="Até..."
            value={filters.anoAte}
            onChange={handleChange}
          />
        </div>
        <div className="max-w-80">
          <Label className="text-muted-foreground">Valor de:</Label>
          <Input
            name="valorDe"
            placeholder="Valor de..."
            value={filters.valorDe}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[^\d]/g, "");
              const formattedValue = formatCurrency(rawValue);
              setFilters((prev) => ({
                ...prev,
                valorDe: formattedValue,
              }));
            }}
          />
        </div>
        <div className="max-w-80">
          <Label className="text-muted-foreground">Valor até:</Label>
          <Input
            name="valorAte"
            placeholder="Valor até..."
            value={filters.valorAte}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[^\d]/g, "");
              const formattedValue = formatCurrency(rawValue);
              setFilters((prev) => ({
                ...prev,
                valorAte: formattedValue,
              }));
            }}
          />
        </div>
        {/* Tipo Modelo */}
        <div className="max-w-80">
          <Label className="text-muted-foreground">Tipo de Modelo</Label>
          <Select
            onValueChange={(value) => handleSelectChange("tipoModelo", value)}
            value={filters.tipoModelo}
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
        <div className="max-w-80 flex items-center gap-2">
          <div className="flex gap-1 items-center">
            <Label className="text-muted-foreground">Ar Condicionado</Label>
            <Switch
              checked={filters.arCondicionado}
              onCheckedChange={handleSwitchChange("arCondicionado")}
            />
          </div>
          <div className="flex gap-1 items-center">
            <Label className="text-muted-foreground">Blindagem</Label>
            <Switch
              checked={filters.blindagem}
              onCheckedChange={handleSwitchChange("blindagem")}
            />
          </div>
        </div>
      </div>
      <div className="max-w-80 pt-4">
        <Button type="submit" onClick={handleFilter}>
          Aplicar filtros <CheckCheck />
        </Button>
      </div>
    </section>
  );
}
