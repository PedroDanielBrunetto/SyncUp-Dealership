"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getFilteredItems } from "./actions";
import { Item } from "@/types/Item";

const EstoquePage = () => {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    const marca = searchParams.get("marca");
    const modelo = searchParams.get("modelo");
    const filteredItems = await getFilteredItems(
      marca || undefined,
      modelo || undefined
    );
    setItems(filteredItems);
  };

  useEffect(() => {
    fetchItems();
  }, [searchParams]);

  return (
    <div>
      <h1>Lista de Veículos</h1>
      {items.length === 0 && <p>Nenhum item encontrado.</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`/estoque/${item.id}`}>
              {item.marca} {item.modelo} - {item.ano} - R${" "}
              {item.valor.toFixed(2)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EstoquePage;
