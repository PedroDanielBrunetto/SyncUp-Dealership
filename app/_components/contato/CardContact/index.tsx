"use client";

import Image from "next/image";
import carImage from "@/public/carros/BMW.png";
import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";

const CardContact = () => {
  return (
    <div>
      <div className="flex justify-between lg:flex-row flex-col gap-16 items-center">
        <div className="2xl:pl-40 xl:pl-32 lg:pl-24">
          <h1 className="2xl:text-6xl xl:text-5xl lg:text-4xl text-[44px] leading-none font-bold text-main">
            Contato
          </h1>
          <div className="lg:pt-6 pt-3 flex flex-col gap-6">
            <button className="bg-[#0c0c0c] flex gap-10 text-white items-center p-4 text-lg lg:text-2xl rounded-xl w-80 lg:w-96 xl:w-[460px] font-medium">
              <Phone size={40} /> Contato
            </button>
            <button className="bg-[#0c0c0c] flex gap-10 text-white items-center p-4 text-lg lg:text-2xl rounded-xl w-80 lg:w-96 xl:w-[460px] font-medium">
              <Mail size={40} /> Enviar um e-mail
            </button>
            <button className="bg-[#0c0c0c] flex gap-10 text-white items-center p-4 text-lg lg:text-2xl rounded-xl w-80 lg:w-96 xl:w-[460px] font-medium">
              <MessageCircle size={40} /> WhatsApp
            </button>
            <button className="bg-[#0c0c0c] flex gap-10 text-white items-center p-4 text-lg lg:text-2xl rounded-xl w-80 lg:w-96 xl:w-[460px] font-medium">
              <Instagram size={40} /> Instagram
            </button>
          </div>
        </div>
        <div className="2xl:w-[900px] lg:w-[720px]">
          <Image src={carImage} alt="Carro" />
        </div>
      </div>
    </div>
  );
};

export default CardContact;
