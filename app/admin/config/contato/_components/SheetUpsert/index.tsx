"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PenBoxIcon } from "lucide-react";
import { useState } from "react";

interface IProps {
  id: number;
  valor: string;
  tipo: string;
  lastUpdateAt: Date;
  lastUpdateBy: string;
}

export default function SheetUpsertContato(data: IProps) {
  const [valueForUpdate, setValueForUpdate] = useState("");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <PenBoxIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar</SheetTitle>
          <SheetDescription>
            Altere o{" " + data.tipo}. Os valores editados aqui serão exibidos
            na página institucional.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Antes
            </Label>
            <Input
              id="valueBefore"
              value={data.valor}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Depois
            </Label>
            <Input
              id="valueAfter"
              onChange={(e) => setValueForUpdate(e.target.value)}
              value={valueForUpdate}
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Salvar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
