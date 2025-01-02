import {
  Combustivel,
  StatusVenda,
  TipoBlindagem,
  TipoModelo,
  Tracao,
  Transmissao,
} from "@prisma/client";

export interface ICadastroCarroPayload {
  modelo: string;
  tipoModelo: TipoModelo;
  versao: string;
  marca: string;
  valor: number;
  anoFab: number;
  anoMod: number;
  hodometro: number;
  detalhes: string | null;
  portas: number;
  lugares: number | null;
  placa: string;
  combustivel: Combustivel;
  transmissao: Transmissao;
  velocidades: number | null;
  arCondicionado: boolean;
  blindagem: boolean;
  tipoBlindagem: TipoBlindagem | null;
  tracao: Tracao | null;
  portaMalas: number | null;
  cavalos: number | null;
  pesoVeiculo: number | null;
  cor: string;
  bancos: string | null;
  velocidadeMax: number | null;
  capacidadeTanque: number | null;
  status: StatusVenda;
}
