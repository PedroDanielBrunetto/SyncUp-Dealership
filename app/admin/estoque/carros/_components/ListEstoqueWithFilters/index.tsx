"use client";

import CardEstoque from "@/app/_components/estoque/CardEstoque";
import SkeletonCard from "@/app/_components/estoque/SkeletonCard";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TipoModelo } from "@/utils/constants/CadastroCarroForm";
import { formatCurrency } from "@/utils/functions/formatCurrency";
import { generateFiltersFieldsEstoquePayload } from "@/utils/functions/generateFiltersFieldsEstoquePayload";
import { verifyFilterFieldsEstoque } from "@/utils/functions/verifyFilterFieldsEstoque";
import { IFiltersFieldsEstoquePayload } from "@/utils/interfaces/IFiltersFieldsEstoquePayload";
import { CheckCheck, Eraser, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ItemEstoque {
  valor: string;
  id: number;
  public_id: string;
  modelo: string;
  tipoModelo: string;
  versao: string;
  marca: string;
  anoFab: number;
  anoMod: number;
  hodometro: number;
}

interface ListEstoqueWithFiltersAdminProps {
  initialData: ItemEstoque[] | null;
}

export default function ListEstoqueWithFiltersAdmin({
  initialData,
}: ListEstoqueWithFiltersAdminProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
  const [itemsFiltered, setItemsFiltered] = useState<any>([]);

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
    try {
      setLoading(true);

      const payload: IFiltersFieldsEstoquePayload =
        generateFiltersFieldsEstoquePayload(filters);

      const verifyFields = verifyFilterFieldsEstoque(payload);
      if (verifyFields != true) {
        setMessage(verifyFields);
        return;
      }

      const res = await filterAdminStockAsync(payload);

      if (res.message != "")
        toast("Sem resultados", {
          description: "Nenhum resultado encontrado.",
          action: {
            label: <X />,
            onClick: () => console.log("SyncUp Brasil. www.syncupbrasil.tech"),
          },
        });

      setItemsFiltered(res.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  const handleClean = () => {
    setFilters({
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
    setItemsFiltered([]);
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
      <div className="max-w-80 pt-4 pb-2 flex gap-2 items-center">
        <Button type="submit" onClick={handleFilter} disabled={loading}>
          {loading ? (
            <>
              <span className="mr-2 loader"></span> Filtrando...
            </>
          ) : (
            <>
              Aplicar Filtros <CheckCheck className="ml-2" />
            </>
          )}
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-muted-foreground" onClick={handleClean}>
                <Eraser />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Limpar Filtros</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <span className="text-muted-foreground text-sm">{message}</span>
      <div className="grid auto-rows-min gap-4 lg:grid-cols-4 md:grid-cols-3 items-center pt-6">
        {itemsFiltered.length > 0
          ? itemsFiltered.map((item: any) => (
              <CardEstoque
                key={item.id}
                admin={true}
                avatar={item?.avatar}
                modelo={item.modelo}
                marca={item.marca}
                anoFab={item.anoFab}
                anoMod={item.anoMod}
                hodometro={item.hodometro}
                valor={item.valor}
                placa={item.placa}
                public_id={item.public_id}
              />
            ))
          : initialData
          ? initialData.map((item: any) => (
              <CardEstoque
                key={item.id}
                admin={true}
                avatar={item?.avatar}
                modelo={item.modelo}
                marca={item.marca}
                anoFab={item.anoFab}
                anoMod={item.anoMod}
                hodometro={item.hodometro}
                valor={item.valor}
                placa={item.placa}
                public_id={item.public_id}
              />
            ))
          : Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
      </div>
    </section>
  );
}
