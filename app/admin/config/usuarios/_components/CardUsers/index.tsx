"use client";

import { deleteUserAsync } from "@/app/admin/_actions/deleteUser";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { TrashIcon, X } from "lucide-react";
import { useState } from "react";

interface IProps {
  idUser: string;
  firstName: string;
  lastName: string;
  image: string;
  email: {
    id: string;
    email_address: string;
  }[];
  phone: {
    id: string;
    phone_number: string;
  }[];
  createdAt: number;
  updatedAt: number;
  lastActiveAt: number;
}

export default function CardUsers({
  idUser,
  firstName,
  lastName,
  image,
  email,
  phone,
  createdAt,
  updatedAt,
  lastActiveAt,
}: IProps) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-white shadow-md border rounded-lg p-4 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={`${firstName} ${lastName}`}
          className="w-16 h-16 rounded-full border"
        />
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {firstName} {lastName}
          </h2>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <TrashIcon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Excluir: {firstName} {lastName}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Você tem certeza que deseja excluir o usuário: {firstName}?{" "}
                  <br />
                  <strong>Essa ação não pode ser desfeita.</strong>
                  <br />
                  ID: {idUser}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  disabled={loading}
                  onClick={async () => {
                    try {
                      setLoading(true);
                      const response = await deleteUserAsync(idUser);
                      toast(response.status ? "Sucesso!" : "Erro", {
                        description: response.status
                          ? "Usuário deletado com sucesso!"
                          : "Tente novamente.",
                        action: {
                          label: <X />,
                          onClick: () => console.log("Usuário deletado."),
                        },
                      });
                      if (!response.status) console.error(response.message);
                    } catch (error) {
                      console.error(error);
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <span className="mr-2 loader"></span> Excluindo
                    </>
                  ) : (
                    <>Excluir</>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div>
        <strong className="text-sm text-gray-600">Emails:</strong>
        <ul className="list-disc list-inside mt-1">
          {email.map((e) => (
            <li key={e.id} className="text-sm text-gray-700">
              {e.email_address}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <strong className="text-sm text-gray-600">Telefones:</strong>
        <ul className="list-disc list-inside mt-1">
          {phone.map((p) => (
            <li key={p.id} className="text-sm text-gray-700">
              {p.phone_number}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-sm text-gray-500">
        <p>Conta criada: {new Date(createdAt).toLocaleDateString()}</p>
        <p>Última atualização: {new Date(updatedAt).toLocaleDateString()}</p>
        <p>Última atividade: {new Date(lastActiveAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
