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
import { db } from "@/lib/prisma";

import { auth } from "@clerk/nextjs/server";
import { Separator } from "@radix-ui/react-separator";
import { redirect } from "next/navigation";
import SheetUpsertContato from "./_components/SheetUpsert";
import { EnumContatos } from "@/utils/enums/contatos";

interface ITb_Contato {
  id: number;
  email: string;
  celular: string;
  whatsAppUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  updatedAt: Date;
  updatedBy: string;
}

export default async function adminConfigContato() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/admin/login");
  }

  const data = (await db.contato.findUnique({
    where: {
      id: 1,
    },
  })) as ITb_Contato;
  console.log(data);

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
                <BreadcrumbPage>Contato</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl">Contato</h2>
            <span className="text-xs text-gray-500 -mt-2">
              A última atualização nos contatos foi feita por:
              {" " + data.updatedBy}. <br />
              Data Horário:{" "}
              {" " +
                data.updatedAt.toLocaleDateString() +
                " " +
                data.updatedAt.toLocaleTimeString()}
            </span>
            <div className="flex flex-col gap-6">
              {/* E-mail */}
              <div className="flex flex-col">
                <label className="text-sm">E-mail:</label>
                <div className="flex gap-2 items-center">
                  <a
                    href={`mailto:${data.email}`}
                    className="text-black underline"
                  >
                    {data.email}
                  </a>
                  <SheetUpsertContato
                    tipo={EnumContatos.Email}
                    id={data.id}
                    valor={data.email}
                    lastUpdateAt={data.updatedAt}
                    lastUpdateBy={data.updatedBy}
                  />
                </div>
              </div>
              {/* Celular */}
              <div className="flex flex-col">
                <label className="text-sm">Celular:</label>
                <div className="flex gap-2 items-center">
                  <a
                    href={`tel:+${data.celular}`}
                    className="text-black underline"
                  >
                    {data.celular}
                  </a>
                  <SheetUpsertContato
                    tipo={EnumContatos.Celular}
                    id={data.id}
                    valor={data.celular}
                    lastUpdateAt={data.updatedAt}
                    lastUpdateBy={data.updatedBy}
                  />
                </div>
              </div>
              {/* WhatsApp */}
              <div className="flex flex-col">
                <label className="text-sm">WhatsApp:</label>
                <div className="flex gap-2 items-center">
                  <a href={data.whatsAppUrl} className="text-black underline">
                    {data.whatsAppUrl}
                  </a>
                  <SheetUpsertContato
                    tipo={EnumContatos.WhatsApp}
                    id={data.id}
                    valor={data.whatsAppUrl}
                    lastUpdateAt={data.updatedAt}
                    lastUpdateBy={data.updatedBy}
                  />
                </div>
              </div>
              {/* Instagram */}
              <div className="flex flex-col">
                <label className="text-sm">Instagram:</label>
                <div className="flex gap-2 items-center">
                  <a href={data.instagramUrl} className="text-black underline">
                    {data.instagramUrl}
                  </a>
                  <SheetUpsertContato
                    tipo={EnumContatos.Instagram}
                    id={data.id}
                    valor={data.instagramUrl}
                    lastUpdateAt={data.updatedAt}
                    lastUpdateBy={data.updatedBy}
                  />
                </div>
              </div>
              {/* Facebook */}
              <div className="flex flex-col">
                <label className="text-sm">Facebook:</label>
                <div className="flex gap-2 items-center">
                  <a href={data.facebookUrl} className="text-black underline">
                    {data.facebookUrl}
                  </a>
                  <SheetUpsertContato
                    tipo={EnumContatos.Facebook}
                    id={data.id}
                    valor={data.facebookUrl}
                    lastUpdateAt={data.updatedAt}
                    lastUpdateBy={data.updatedBy}
                  />
                </div>
              </div>
              {/* Youtube */}
              <div className="flex flex-col">
                <label className="text-sm">Youtube:</label>
                <div className="flex gap-2 items-center">
                  <a href={data.youtubeUrl} className="text-black underline">
                    {data.youtubeUrl}
                  </a>
                  <SheetUpsertContato
                    tipo={EnumContatos.YouTube}
                    id={data.id}
                    valor={data.youtubeUrl}
                    lastUpdateAt={data.updatedAt}
                    lastUpdateBy={data.updatedBy}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
