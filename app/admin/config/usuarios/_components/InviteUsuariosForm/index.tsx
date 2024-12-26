"use client";

import { inviteUserAsync } from "@/app/admin/_actions/inviteUser";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminInviteUsuariosForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleInvite = async () => {
    try {
      setLoading(true);
      const response = await inviteUserAsync(email);
      toast(response.status ? "Sucesso!" : "Erro", {
        description: response.status
          ? "Convite enviado com sucesso!"
          : "Tente novamente.",
        action: {
          label: <X />,
          onClick: () => console.log("Convite enviado."),
        },
      });
      if (!response.status) console.error(response.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setEmail("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Criar Usuário</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Usuário</DialogTitle>
          <DialogDescription>
            Um convite será enviado para o e-mail do usuário, com isso ele ira
            criar a conta.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              E-mail
            </Label>
            <Input
              id="email"
              placeholder="exemplo@email.com"
              className="col-span-3"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Tipo
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipos</SelectLabel>
                  <SelectItem value="Funcionário">Funcionário</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="flex items-center justify-center"
            disabled={loading}
            onClick={handleInvite}
          >
            {loading ? (
              <>
                <span className="mr-2 loader"></span> Enviando
              </>
            ) : (
              <>
                Enviar <ArrowRight />
              </>
            )}
          </Button>{" "}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
