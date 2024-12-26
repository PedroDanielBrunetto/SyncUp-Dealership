"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

export const deleteUserAsync = async (idUser: string) => {
  try {
    const res = (await axios.delete(
      `https://api.clerk.com/v1/users/${idUser}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      }
    )) as any;

    if (res.status == 400 || res.status == 422) {
      throw new Error(res.errors[0].message);
    }

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
