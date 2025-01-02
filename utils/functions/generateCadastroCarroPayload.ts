import { ICadastroCarroPayload } from "../interfaces/ICadastroCarroPayload";

export const generateCadastroCarroPayload = (
  formData: any
): ICadastroCarroPayload => {
  const payload = {
    ...formData,
    valor:
      formData.valor == ""
        ? null
        : parseFloat(formData.valor.replace(/[^\d,]/g, "").replace(",", ".")),
    anoFab: formData.anoFab == "" ? null : parseInt(formData.anoFab, 10),
    anoMod: formData.anoMod == "" ? null : parseInt(formData.anoMod, 10),
    hodometro:
      formData.hodometro == "" ? null : parseInt(formData.hodometro, 10),
    portas: formData.portas == "" ? null : parseInt(formData.portas, 10),
    lugares: formData.lugares == "" ? null : parseInt(formData.lugares, 10),
    velocidades:
      formData.velocidades == "" ? null : parseInt(formData.velocidades, 10),
    portaMalas:
      formData.portaMalas == "" ? null : parseInt(formData.portaMalas, 10),
    cavalos: formData.cavalos == "" ? null : parseInt(formData.cavalos, 10),
    pesoVeiculo:
      formData.pesoVeiculo == "" ? null : parseInt(formData.pesoVeiculo, 10),
    velocidadeMax:
      formData.velocidadeMax == ""
        ? null
        : parseInt(formData.velocidadeMax, 10),
    capacidadeTanque:
      formData.capacidadeTanque == ""
        ? null
        : parseInt(formData.capacidadeTanque, 10),
    detalhes: formData.detalhes == "" ? null : formData.detalhes,
    bancos: formData.bancos == "" ? null : formData.bancos,
    tracao: formData.tracao == "" ? null : formData.tracao,
    tipoBlindagem:
      !formData.blindagem || formData.tipoBlindagem == ""
        ? null
        : formData.tipoBlindagem,
  } as ICadastroCarroPayload;

  return payload;
};
