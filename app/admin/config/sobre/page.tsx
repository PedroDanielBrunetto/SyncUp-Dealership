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
import { auth, currentUser } from "@clerk/nextjs/server";
import { Separator } from "@radix-ui/react-separator";
import { redirect } from "next/navigation";
import AdminConfigSobreForm from "./_components/SobreForm";
import { db } from "@/lib/prisma";

export default async function adminConfigSobre() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/admin/login");
  }

  const { firstName, lastName } = (await currentUser()) as any;

  const data = (await db.sobre.findUnique({
    where: {
      id: 1,
    },
  })) as any;

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
            <span className="text-xs text-gray-500 -mt-2">
              A última atualização na Página Sobre foi feita por:
              {" " + data.updatedBy}. <br />
              Data Horário:{" "}
              {" " +
                data.updatedAt.toLocaleDateString() +
                " " +
                data.updatedAt.toLocaleTimeString()}
            </span>
            <AdminConfigSobreForm
              id={data?.id}
              sobreNos={data?.sobreNos}
              missao={data?.missao}
              visao={data?.visao}
              localizacao={data?.localizacao}
              user={`${firstName} ${lastName}`}
            />
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
