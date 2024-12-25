"use server";

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
import { Skeleton } from "@/components/ui/skeleton";
import AdminInviteUsuariosForm from "./_components/InviteUsuariosForm";
import CardUsers from "./_components/CardUsers";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

export default async function adminConfigUsuarios() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/admin/login");
  }

  let allUsers: any[] = [];
  let isLoading = true;

  try {
    allUsers = (
      await axios.get("https://api.clerk.com/v1/users", {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      })
    ).data;
    isLoading = false;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
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
                <BreadcrumbPage>Usuários</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl">Usuários</h2>
            <div className="flex">
              <AdminInviteUsuariosForm />
            </div>
            <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
              {isLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-[200px] w-full bg-gray-200 rounded-md"
                    />
                  ))
                : allUsers.map((m: any) => (
                    <CardUsers
                      key={m.id}
                      idUser={m.id}
                      firstName={m.first_name}
                      lastName={m.last_name}
                      email={m.email_addresses}
                      phone={m.phone_numbers}
                      createdAt={m.created_at}
                      lastActiveAt={m.last_active_at}
                      updatedAt={m.updated_at}
                      image={m.image_url}
                    />
                  ))}
            </div>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
