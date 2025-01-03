"use server";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
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
import AdminCadastroCarroForm from "../../_components/CadastroCarro";
import { Separator } from "@/components/ui/separator";
import { Carro } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { formatCurrency } from "@/utils/functions/formatCurrency";

interface updateCarProps {
  params: { uuid: string };
}

const adminEstoqueCarrosCadastroUpdate = async ({ params }: updateCarProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/admin/login");
  }

  const { uuid } = await params;
  const item = (await db.carro.findUnique({
    where: {
      public_id: uuid,
    },
  })) as Carro;

  const itemFormatted = item
    ? {
        ...item,
        valor:
          item.valor instanceof Decimal
            ? item.valor.toNumber() % 1 === 0
              ? formatCurrency((item.valor.toNumber() * 100).toString())
              : formatCurrency(
                  (item.valor.toNumber() * 100).toString().replace(".", ",")
                )
            : item.valor,
      }
    : null;

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
              <BreadcrumbLink href="/admin/estoque/carros">
                <BreadcrumbPage>Estoque de Carros</BreadcrumbPage>
              </BreadcrumbLink>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbLink href="/admin/estoque/carros/cadastro">
                <BreadcrumbPage>Cadastro</BreadcrumbPage>
              </BreadcrumbLink>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Atualizar Veículo</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl">
              Atualizar o veículo - {item?.modelo || "Não Encontrado"}
            </h2>
            <span className="text-xs text-gray-500 -mt-2">
              A última atualização nesse veículo foi feita por:
              {" " + item.updatedBy}. <br />
              Data Horário:{" "}
              {" " +
                item.updatedAt.toLocaleDateString() +
                " " +
                item.updatedAt.toLocaleTimeString()}
            </span>
            <AdminCadastroCarroForm
              key={item.id}
              public_id={itemFormatted?.public_id}
              modelo={itemFormatted?.modelo}
              tipoModelo={itemFormatted?.tipoModelo}
              versao={itemFormatted?.versao}
              marca={itemFormatted?.marca}
              valor={itemFormatted?.valor}
              anoFab={itemFormatted?.anoFab}
              anoMod={itemFormatted?.anoMod}
              hodometro={itemFormatted?.hodometro}
              detalhes={itemFormatted?.detalhes}
              portas={itemFormatted?.portas}
              lugares={itemFormatted?.lugares}
              placa={itemFormatted?.placa}
              combustivel={itemFormatted?.combustivel}
              transmissao={itemFormatted?.transmissao}
              velocidades={itemFormatted?.velocidades}
              arCondicionado={itemFormatted?.arCondicionado}
              blindagem={itemFormatted?.blindagem}
              tipoBlindagem={itemFormatted?.tipoBlindagem}
              tracao={itemFormatted?.tracao}
              portaMalas={itemFormatted?.portaMalas}
              cavalos={itemFormatted?.cavalos}
              pesoVeiculo={itemFormatted?.pesoVeiculo}
              cor={itemFormatted?.cor}
              bancos={itemFormatted?.bancos}
              velocidadeMax={itemFormatted?.velocidadeMax}
              capacidadeTanque={itemFormatted?.capacidadeTanque}
              avatar={itemFormatted?.avatar}
              status={itemFormatted?.status}
              createdAt={itemFormatted?.createdAt}
              updatedAt={itemFormatted?.updatedAt}
              createdBy={itemFormatted?.createdBy}
              updatedBy={itemFormatted?.updatedBy}
              att={true}
            />
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default adminEstoqueCarrosCadastroUpdate;
