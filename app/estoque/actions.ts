import { Item } from "@/types/Item";

const mockData: Item[] = [
  { id: "1", marca: "Chevrolet", modelo: "SUV", ano: 2022, valor: 20501.24 },
  { id: "2", marca: "Ford", modelo: "Sedan", ano: 2021, valor: 15000 },
  { id: "3", marca: "Chevrolet", modelo: "Hatch", ano: 2023, valor: 30000 },
];

export const getFilteredItems = async (
  marca?: string,
  modelo?: string
): Promise<Item[]> => {
  return mockData.filter(
    (item) =>
      (!marca || item.marca.toLowerCase() === marca.toLowerCase()) &&
      (!modelo || item.modelo.toLowerCase() === modelo.toLowerCase())
  );
};

export const getItemDetails = async (uuid: string): Promise<Item | null> => {
  return mockData.find((item) => item.id === uuid) || null;
};
