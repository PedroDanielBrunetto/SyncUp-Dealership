import { IFiltersFieldsEstoquePayload } from "../interfaces/IFiltersFieldsEstoquePayload";

export function verifyFilterFieldsEstoque(
  payload: IFiltersFieldsEstoquePayload
) {
  if (
    !payload.placa &&
    !payload.modelo &&
    !payload.tipoModelo &&
    !payload.anoDe &&
    !payload.anoAte &&
    !payload.valorDe &&
    !payload.valorAte &&
    !payload.arCondicionado &&
    !payload.blindagem
  )
    return "Você deve pelo menos preencher um campo.";
  else return true;
}
