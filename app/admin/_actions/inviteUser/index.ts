"use server";

import axios from "axios";

export const inviteUserAsync = async (email: string) => {
  try {
    const res = (await axios.post(
      `https://api.clerk.com/v1/invitations`,
      {
        email_address: email,
        public_metadata: {
          userType: "Funcionário",
        },
        notify: true,
        ignore_existing: false,
        expires_in_days: 7,
        template_slug: "invitation",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    )) as any;

    if (res.status == 400 || res.status == 422) {
      throw new Error(res.errors[0].message);
    }

    return {
      status: true,
      message: "Convite enviado com sucesso!",
    };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
};
