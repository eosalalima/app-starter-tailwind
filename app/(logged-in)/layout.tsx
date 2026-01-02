import { AppSidebar } from "@/components/app/app-sidebar";
import { AppNavbar } from "@/components/app/app-navbar";
import { SidebarLayout } from "@/components/ui-kit/sidebar-layout";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoggedInLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    return (
        <SidebarLayout navbar={<AppNavbar />} sidebar={<AppSidebar />}>
            <main className="flex-1">{children}</main>
        </SidebarLayout>
    );
}
