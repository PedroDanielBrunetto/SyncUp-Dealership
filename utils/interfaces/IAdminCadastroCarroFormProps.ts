import {
  Combustivel,
  StatusVenda,
  TipoBlindagem,
  TipoModelo,
  Tracao,
  Transmissao,
} from "@prisma/client";

export interface IAdminCadastroCarroFormProps {
  public_id?: string;
  modelo?: string;
  tipoModelo?: TipoModelo;
  versao?: string;
  marca?: string;
  valor?: string;
  anoFab?: number;
  anoMod?: number;
  hodometro?: number;
  detalhes?: string | null;
  portas?: number;
  lugares?: number | null;
  placa?: string;
  combustivel?: Combustivel;
  transmissao?: Transmissao;
  velocidades?: number | null;
  arCondicionado?: boolean;
  blindagem?: boolean | null;
  tipoBlindagem?: TipoBlindagem | null;
  tracao?: Tracao | null;
  portaMalas?: number | null;
  cavalos?: number | null;
  pesoVeiculo?: number | null;
  cor?: string;
  bancos?: string | null;
  velocidadeMax?: number | null;
  capacidadeTanque?: number | null;
  avatar?: string | null;
  status?: StatusVenda;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string | null;
  att?: boolean;
}
