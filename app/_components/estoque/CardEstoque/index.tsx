import { ChevronRight, PenBox } from "lucide-react";

interface ICardEstoqueProps {
  public_id: string;
  marca: string;
  modelo: string;
  anoFab: number;
  anoMod: number;
  hodometro: number;
  valor: string;
  placa?: string | null;
  avatar?: string | null;
  admin?: boolean;
}

export default function CardEstoque({
  public_id,
  marca,
  modelo,
  anoFab,
  anoMod,
  hodometro,
  valor,
  placa,
  avatar,
  admin,
}: ICardEstoqueProps) {
  return (
    <div className="w-full max-w-xs p-4 flex flex-col gap-4 border border-gray-300 rounded-xl">
      <div className="h-48 w-full bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={avatar || "/placeholder-image.png"}
          alt={`${marca} ${modelo}`}
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <p className="font-medium text-lg">
          {marca} {modelo}
        </p>
        <span className="text-muted-foreground text-sm">
          {anoFab}/{anoMod} | {hodometro.toLocaleString()} KMs
        </span>
        <br />
        {admin && (
          <span className="text-muted-foreground text-sm">Placa: {placa}</span>
        )}
      </div>
      <div className="flex gap-1 items-center">
        <span className="text-sm text-muted-foreground">R$</span>
        <span className="text-lg font-medium">{valor}</span>
      </div>
      <div>
        {admin ? (
          <a
            href={`/admin/estoque/carros/cadastro/${public_id}`}
            className="text-muted-foreground"
          >
            <PenBox />
          </a>
        ) : (
          <a href={`/estoque/${public_id}`} className="text-muted-foreground">
            <ChevronRight />
          </a>
        )}
      </div>
    </div>
  );
}
