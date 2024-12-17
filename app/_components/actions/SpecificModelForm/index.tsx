"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ArrowRight } from "lucide-react";
import { insertSpecificModelAsync } from "@/app/_actions/insertSpecificModel";

const SpecificModel = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    model: "",
    agree: false,
  });

  const [message, setMessage] = useState("");
  const [load, setLoad] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSwitch = () => {
    setFormData((prev) => ({ ...prev, agree: !prev.agree }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoad(true);

      if (!formData.agree) {
        setMessage("Você deve concordar com a Política de Privacidade.");
        return;
      }

      if (
        !formData.email ||
        !formData.phone ||
        !formData.name ||
        !formData.model
      ) {
        setMessage("Preencha todos os campos.");
        return;
      }

      const response = await insertSpecificModelAsync(formData);

      const result = await response;

      setMessage(result);
    } catch (error) {
      setMessage("Desculpe, algo deu errado. Tente novamente mais tarde.");
    } finally {
      setLoad(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        model: "",
        agree: false,
      });
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

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
          <form
            className="flex lg:flex-row flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <Input
              type="text"
              placeholder="Nome"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="border-gray-400 W-44"
            />
            <Input
              type="email"
              placeholder="Email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="border-gray-400 W-44"
            />
            <Input
              type="text"
              placeholder="Modelo"
              id="model"
              value={formData.model}
              onChange={handleChange}
              className="border-gray-400 W-44"
            />
            <Input
              type="text"
              placeholder="Celular"
              id="phone"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 12) {
                  handlePhoneChange(value);
                }
              }}
              className="border-gray-400 W-44"
            />
            <Button
              type="submit"
              className="w-44 flex items-center justify-center"
              disabled={load}
            >
              {load ? (
                <>
                  <span className="mr-2 loader"></span> Enviando
                </>
              ) : (
                <>
                  Enviar <ArrowRight className="ml-2" />
                </>
              )}
            </Button>
          </form>
          <div className="flex gap-2 items-center">
            <Switch checked={formData.agree} onCheckedChange={handleSwitch} />
            <span className="text-gray-900 text-xs">
              De acordo com a LGPD, concordo em fornecer os dados acima para que
              a concessionária entre em contato comigo para apresentar serviços.
              Seu nome, e-mail e telefone serão usados de acordo com a nossa
              Política de Privacidade.
            </span>
          </div>
          {message && <p className="text-sm mt-2">{message}</p>}
        </div>
      </div>
    </section>
  );
};

export default SpecificModel;
