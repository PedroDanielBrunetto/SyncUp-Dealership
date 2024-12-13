"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ArrowRight } from "lucide-react";

const SpecificModel = () => {
  return (
    <section>
      <div className="lg:p-main pt-6 flex flex-col p-4 gap-4">
        <div>
          <h1 className="text-3xl font-semibold">
            Você está procurando
            <br />
            algum modelo em específico?
          </h1>
        </div>
        <div className="border border-gray-400 rounded-lg lg:p-16 p-8 flex flex-col gap-4">
          <form className="flex lg:flex-row flex-col gap-4">
            <div>
              <Input
                type="text"
                placeholder="Nome"
                className="border-gray-400 W-44"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                className="border-gray-400 W-44"
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Modelo"
                className="border-gray-400 W-44"
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Celular"
                className="border-gray-400 W-44"
              />
            </div>
            <div>
              <Button className="w-44">
                Enviar <ArrowRight />
              </Button>
            </div>
          </form>
          <div className="flex gap-2">
            <Switch />{" "}
            <span className="text-gray-900 text-xs">
              De acordo com a LGPD, concordo em fornecer os dados acima para que
              a Touring Cars entre em contato comigo para apresentar serviços.
              Seu nome, e-mail e telefone serão usados de acordo com a nossa
              Política de Privacidade.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecificModel;
