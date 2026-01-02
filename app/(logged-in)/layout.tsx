import { AppSidebar } from "@/components/app/app-sidebar";
import { AppNavbar } from "@/components/app/app-navbar";
import { SidebarLayout } from "@/components/ui-kit/sidebar-layout";

export default function LoggedInLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarLayout navbar={<AppNavbar />} sidebar={<AppSidebar />}>
            <main className="flex-1">{children}</main>
        </SidebarLayout>
    );
}
