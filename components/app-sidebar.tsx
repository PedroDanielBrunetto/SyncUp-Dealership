import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { SearchForm } from "@/components/search-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/admin/home",
      items: [
        {
          title: "Dashboard",
          url: "/admin/home",
        },
      ],
    },
    {
      title: "Clientes",
      url: "#",
      items: [
        {
          title: "Todos os Clientes",
          url: "/admin/cliente",
        },
        {
          title: "Prospecção de Clientes",
          url: "/admin/cliente/prospeccao",
        },
      ],
    },
    {
      title: "Estoque",
      url: "#",
      items: [
        {
          title: "Carros",
          url: "/admin/estoque/carros",
        },
        {
          title: "Motos",
          url: "/admin/estoque/motos",
        },
      ],
    },
    {
      title: "Vendas",
      url: "#",
      items: [
        {
          title: "Carros",
          url: "/admin/vendas/carros",
        },
        {
          title: "Motos",
          url: "/admin/vendas/motos",
        },
        {
          title: "Financiamento",
          url: "/admin/vendas/financiamento",
        },
      ],
    },
    {
      title: "Configurações",
      url: "#",
      items: [
        {
          title: "Destaque Semanal",
          url: "/admin/config/destaque",
        },
        {
          title: "Página Sobre",
          url: "/admin/config/sobre",
        },
        {
          title: "Contato",
          url: "/admin/config/contato",
        },
        {
          title: "Usuários",
          url: "/admin/config/usuarios",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex w-full justify-center">
                <UserButton
                  showName
                  afterSignOutUrl="/admin/login"
                  userProfileMode="modal"
                />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              // isActive={item.isActive}
                            >
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
