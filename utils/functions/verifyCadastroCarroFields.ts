import { ICadastroCarroPayload } from "./generateCadastroCarroPayload";

export const verifyCadastroCarroFields = (
  payload: ICadastroCarroPayload
): string | true => {
  switch (true) {
    case payload.modelo === "":
      return "O campo modelo é obrigatório";
    case payload.tipoModelo === "":
      return "O tipo do modelo é obrigatório";
    case payload.versao === "":
      return "A Versão é obrigatório";
    case payload.marca === "":
      return "A Marca é obrigatório";
    case payload.valor === null:
      return "O valor do carro é obrigatório";
    case payload.anoFab === null:
      return "O ano de fabricação é obrigatório";
    case payload.anoMod === null:
      return "O ano de modelo é obrigatório";
    case payload.hodometro === null:
      return "A kilometragem é obrigatório";
    case payload.portas === null:
      return "O número de portas é obrigatório";
    case payload.placa === "":
      return "A placa é obrigatório";
    case payload.combustivel === "":
      return "O combustível é obrigatório";
    case payload.transmissao === "":
      return "A transmissão é obrigatório";
    case payload.cor === "":
      return "A cor é obrigatório";
    case payload.status === "":
      return "O status é obrigatório";
    default:
      return true;
  }
};
