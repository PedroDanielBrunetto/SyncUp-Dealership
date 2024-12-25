"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

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
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <TrashIcon />
          </Button>
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
