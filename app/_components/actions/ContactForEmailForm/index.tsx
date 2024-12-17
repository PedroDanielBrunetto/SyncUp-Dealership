"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const ContactForEmailForm = () => {
  const [load, setLoad] = useState(false);

  return (
    <div className="flex gap-4">
      <Input type="email" placeholder="Email" />
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
    </div>
  );
};

export default ContactForEmailForm;
