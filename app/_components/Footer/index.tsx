"use server";

import Image from "next/image";
import logo from "@/public/logo.png";
import {
  Copyright,
  Facebook,
  Instagram,
  MessageCircle,
  Youtube,
  Globe,
} from "lucide-react";
import ContactForEmailForm from "../actions/ContactForEmailForm";
import { db } from "@/lib/prisma";

const Footer = async () => {
  const data = await db.contato.findUnique({
    where: {
      id: 1,
    },
  });

  return (
    <footer className="pt-12 flex flex-col 2xl:px-40 xl:px-32 lg:px-24 pr-4 p-4">
      <div className="pb-12">
        <hr className="border-gray-300" />
      </div>
      <div className="lg:pb-16 pb-8 flex lg:flex-row flex-col justify-between gap-8">
        <div className="flex flex-col gap-4">
          <div className="w-32">
            <Image src={logo} alt="Logo" />
          </div>
          <p className="font-semibold">Qualidade, Segurança, Transparência.</p>
          <div className="flex gap-8">
            <a href={`https://${data?.instagramUrl || null}`}>
              <Instagram />
            </a>
            <a href={`https://${data?.facebookUrl || null}`}>
              <Facebook />
            </a>
            <a href={`https://${data?.youtubeUrl || null}`}>
              <Youtube />
            </a>
            <a href={`https://${data?.whatsAppUrl || null}`}>
              <MessageCircle />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold">Contato</h3>
          <a
            className="font-medium"
            href={`https://${data?.whatsAppUrl || null}`}
          >
            WhatsApp
          </a>
          <a className="font-medium" href={`mailto:${data?.email || null}`}>
            {data?.email || null}
          </a>
          <a className="font-medium" href={`tel:+55${data?.celular || null}`}>
            {data?.celular || null}
          </a>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold">Inscreva-se</h3>
          <p className="font-medium">
            Informe seu email para receber as <br />
            últimas novidades da Concessionária.
          </p>
          <ContactForEmailForm />
        </div>
      </div>
      <p className="text-gray-400 text-sm flex justify-center gap-1 items-center">
        <Copyright className="text-gray-400" size={14} />
        Todos os direitos reservados.
      </p>
      <a
        className="text-gray-400 text-sm flex justify-center gap-1 items-center underline cursor-pointer"
        href="https://syncupbrasil.tech"
      >
        <Globe className="text-gray-400" size={14} />
        SyncUp Brasil
      </a>
    </footer>
  );
};

export default Footer;
