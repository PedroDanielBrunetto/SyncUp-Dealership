"use server";

interface IReq {
  id: 1;
  fileName: string;
  file: File;
  titulo: string;
  descricao: string;
}

export const updateHighlightAsync = async (data: IReq) => {};
