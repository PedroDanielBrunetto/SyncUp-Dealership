"use server";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@clerk/nextjs/server";
import { Separator } from "@radix-ui/react-separator";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";

export default async function adminConfigSobre() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/admin/login");
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin/home">
                  Concessionária
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Página Sobre</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl">Sobre</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message-2">Sobre nós</Label>
                <Textarea
                  placeholder="Escreva sua mensagem aqui."
                  id="message-2"
                  maxLength={780}
                />
                <p className="text-sm text-muted-foreground">
                  Máximo de 780 carácteres. Altere o texto acima que está sendo
                  exibido na Página Sobre.
                </p>
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message-2">Missão</Label>
                <Textarea
                  placeholder="Escreva sua mensagem aqui."
                  id="message-2"
                  maxLength={120}
                />
                <p className="text-sm text-muted-foreground">
                  Máximo de 120 carácteres. Altere o texto acima que está sendo
                  exibido na Página Sobre.
                </p>
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message-2">Visão</Label>
                <Textarea
                  placeholder="Escreva sua mensagem aqui."
                  id="message-2"
                  maxLength={120}
                />
                <p className="text-sm text-muted-foreground">
                  Máximo de 120 carácteres. Altere o texto acima que está sendo
                  exibido na Página Sobre.
                </p>
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message-2">Localização</Label>
                <Input placeholder="Coloque o link aqui." id="message-2" />
                <p className="text-sm text-muted-foreground">
                  Para conseguir, vá na localização pelo Google Maps {">"}{" "}
                  Compartilhar {">"} Incorporar um mapa {">"} Copiar o link que
                  está dentro do "src"
                </p>
              </div>
            </div>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
