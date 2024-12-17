"use client";

import Image from "next/image";
import logo from "@/public/logo.png";
import {
  Copyright,
  Facebook,
  Instagram,
  MessageCircle,
  Youtube,
} from "lucide-react";
import ContactForEmailForm from "../actions/ContactForEmailForm";

const Footer = () => {
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
            <button>
              <Instagram />
            </button>
            <button>
              <Facebook />
            </button>
            <button>
              <Youtube />
            </button>
            <button>
              <MessageCircle />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold">Contato</h3>
          <a className="font-medium" href="/">
            WhatsApp
          </a>
          <a className="font-medium" href="mailto:contato@touringcars.com.br">
            concessionaria@gmail.com
          </a>
          <a className="font-medium" href="tel:+5513992043766">
            (13) 99204-3766
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
    </footer>
  );
};

export default Footer;
