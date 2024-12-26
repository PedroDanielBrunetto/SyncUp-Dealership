"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

export const deleteUserAsync = async (idUser: string) => {
  try {
    await axios.delete(`https://api.clerk.com/v1/users/${idUser}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    revalidatePath("/admin/config/usuarios");

    return {
      status: true,
      message: "Usuário deletado com sucesso!",
    };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
};
