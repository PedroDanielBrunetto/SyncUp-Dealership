import CardEstoque from "@/app/_components/estoque/CardEstoque";
import SkeletonCard from "@/app/_components/estoque/SkeletonCard";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Decimal } from "@prisma/client/runtime/library";
import { ChevronRight } from "lucide-react";
import { redirect } from "next/navigation";

export default async function adminEstoqueCarros() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/admin/login");
  }

  let items = null;
  try {
    const data = await db.carro.findMany();
    items = data.map((item) => ({
      ...item,
      valor:
        item.valor instanceof Decimal
          ? item.valor
              .toNumber()
              .toFixed(2)
              .replace(".", ",")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".") // Adiciona pontos como separadores de milhar
          : item.valor,
    }));
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
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
                <BreadcrumbPage>Estoque de Carros</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl">Estoque</h2>
            <div>
              <a href="/admin/estoque/carros/cadastro">
                <Button className="items-center">
                  Cadastrar veículo <ChevronRight />
                </Button>
              </a>
            </div>
            <div className="grid auto-rows-min gap-4 lg:grid-cols-4 md:grid-cols-3 items-center">
              {items
                ? items.map((item) => (
                    <CardEstoque
                      key={item.id}
                      admin={true}
                      avatar={item?.avatar}
                      modelo={item.modelo}
                      marca={item.marca}
                      anoFab={item.anoFab}
                      anoMod={item.anoMod}
                      hodometro={item.hodometro}
                      valor={item.valor}
                      placa={item.placa}
                      public_id={item.public_id}
                    />
                  ))
                : Array.from({ length: 8 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
            </div>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
