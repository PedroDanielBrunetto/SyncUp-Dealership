import { IFiltersFieldsEstoquePayload } from "../interfaces/IFiltersFieldsEstoquePayload";

export const generateFiltersFieldsEstoquePayload = (
  filters: any
): IFiltersFieldsEstoquePayload => {
  const payload = {
    ...filters,
    valorDe:
      filters.valorDe == ""
        ? null
        : parseFloat(filters.valorDe.replace(/[^\d,]/g, "").replace(",", ".")),
    valorAte:
      filters.valorAte == ""
        ? null
        : parseFloat(filters.valorAte.replace(/[^\d,]/g, "").replace(",", ".")),
    anoDe: filters.anoDe == "" ? null : parseInt(filters.anoDe, 10),
    anoAte: filters.anoAte == "" ? null : parseInt(filters.anoAte, 10),
  } as IFiltersFieldsEstoquePayload;

  return payload;
};
