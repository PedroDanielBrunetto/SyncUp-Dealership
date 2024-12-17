"use client";

import { insertClientEmailAsync } from "@/app/_actions/insertClientEmail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const ContactForEmailForm = () => {
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoad(true);

      if (!email) {
        setMessage("Preencha seu email.");
        return;
      }

      const response = await insertClientEmailAsync(email);

      const result = await response;

      setMessage(result);
    } catch (error) {
      setMessage("Desculpe, algo deu errado. Tente novamente mais tarde.");
    } finally {
      setLoad(false);
      setEmail("");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form className="flex gap-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
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
      <span className="text-gray-400 text-sm">{message}</span>
    </div>
  );
};

export default ContactForEmailForm;
