import { getItemDetails } from "../actions";

interface EstoquePageProps {
  params: { uuid: string };
}

const EstoqueDetailPage = async ({ params }: EstoquePageProps) => {
  const { uuid } = params;
  const item = await getItemDetails(uuid);

  if (!item) {
    return <div>Item não encontrado.</div>;
  }

  return (
    <div>
      <h1>Detalhes do Veículo</h1>
      <p>ID: {item.id}</p>
      <p>Marca: {item.marca}</p>
      <p>Modelo: {item.modelo}</p>
      <p>Ano: {item.ano}</p>
      <p>Valor: R$ {item.valor.toFixed(2)}</p>
    </div>
  );
};

export default EstoqueDetailPage;
