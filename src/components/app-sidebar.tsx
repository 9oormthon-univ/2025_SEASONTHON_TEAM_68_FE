import logo from "@/../public/images/logo.svg";
import Button from "@/components/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar/sidebar";
import { FileText, ListChecks } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "할 일",
    url: "/tasks",
    icon: ListChecks,
  },
  {
    title: "회의록",
    url: "/notes",
    icon: FileText,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="*:bg-foreground">
      <SidebarContent>
        <SidebarGroup className="p-8">
          <SidebarGroupLabel className="flex gap-4 items-center mb-12">
            <Image src={logo} alt="Logo" />
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-10">
            <Button variant="gradient" className="w-full h-12">
              <Link href="/">+ 회의록 분석하기</Link>
            </Button>
            <SidebarMenu className="flex flex-col gap-2.5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="flex items-center gap-2 h-12 px-10 tab-m-14 text-gray-0 rounded-full"
                    asChild
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
