export interface ICadastroCarroPayload {
  modelo: string;
  tipoModelo: string;
  versao: string;
  marca: string;
  valor: number;
  anoFab: number;
  anoMod: number;
  hodometro: number;
  detalhes: string;
  portas: number;
  lugares: number | null;
  placa: string;
  combustivel: string;
  transmissao: string;
  velocidades: number | null;
  arCondicionado: boolean;
  blindagem: boolean;
  tipoBlindagem: string;
  tracao: string;
  portaMalas: number | null;
  cavalos: number | null;
  pesoVeiculo: number | null;
  cor: string;
  bancos: string;
  velocidadeMax: number | null;
  capacidadeTanque: number | null;
  status: string;
}

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
  } as ICadastroCarroPayload;

  return payload;
};
