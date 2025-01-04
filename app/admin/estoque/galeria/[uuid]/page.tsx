import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import GaleriaForm from "../_components/GaleriaForm";

interface updateCarProps {
  params: { uuid: string };
}

export default async function adminEstoqueGaleria({ params }: updateCarProps) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/admin/login");
  }

  const { uuid } = await params;

  const verifyCar = await db.carro.findUnique({
    where: {
      public_id: uuid,
    },
  });

  if (!verifyCar) redirect("/admin/estoque/carros");

  const images: any = await db.imagensCarro.findMany({
    where: {
      public_id: uuid,
    },
  });

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
                <BreadcrumbPage>Galeria</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl">Galeria de Imagens</h2>
            <p className="text-muted-foreground text-sm">
              Você tem direito ao cadastro de 10 imagens para galeria de cada
              veículo.
            </p>
            <section>
              <GaleriaForm public_id={uuid} imagesExisted={images} />
            </section>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
