"use server";

import { db } from "@/lib/prisma";

interface updateCarProps {
  params: { uuid: string };
}

const adminEstoqueCarrosCadastroUpdate = async ({ params }: updateCarProps) => {
  const { uuid } = await params;
  const item = await db.carro.findUnique({
    where: {
      public_id: uuid,
    },
  });

  if (!item) {
    return <div>Item não encontrado.</div>;
  }

  return (
    <div>
      <h1>Detalhes do Veículo</h1>
      <p>ID: {item.id}</p>
      <p>Marca: {item.marca}</p>
      <p>Modelo: {item.modelo}</p>
      <p>Ano: {item.anoFab}</p>
      <p>Ano: {item.anoMod}</p>
      <p>Descrição: {item.detalhes}</p>
      <p>Valor: R$ {item.valor.toFixed(2)}</p>
      {item.avatar ? <img src={item.avatar} alt={item.public_id} /> : null}
    </div>
  );
};

export default adminEstoqueCarrosCadastroUpdate;
