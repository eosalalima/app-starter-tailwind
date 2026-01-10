"use client";

import { Navbar, NavbarItem, NavbarSection } from "@/components/ui-kit/navbar";
import { useState } from "react";
import { AppearanceSettings } from "./appearance";
import { AccountSettings } from "./account";
import { NotificationsSettings } from "./notifications";
import { BillingSettings } from "./billing";
import { TeamsSettings } from "./teams";
import { IntegrationsSettings } from "./integrations";
import { auth } from "@/auth";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { getSession } from "./actions";

const secondaryNavigation = [
    { name: "Account", href: "#" },
    { name: "Appearance", href: "#" },
    { name: "Notifications", href: "#" },
    { name: "Billing", href: "#" },
    { name: "Teams", href: "#" },
    { name: "Integrations", href: "#" },
];

export default async function Settings() {
    const [currentNav, setCurrentNav] = useState("Account");
    const session = await getSession();

    const [user] = await db
        .select({
            twoFactorAuthActivated: users.twoFactorAuthActivated,
        })
        .from(users)
        .where(eq(users.id, parseInt(session!.user!.id!)))
        .execute();

    return (
        <main>
            <h1 className="sr-only">Account Settings</h1>

            <header className="border-b border-gray-200">
                <Navbar>
                    <NavbarSection>
                        {secondaryNavigation.map((item) => (
                            <NavbarItem
                                key={item.name}
                                current={item.name === currentNav}
                                onClick={() => setCurrentNav(item.name)}
                            >
                                {item.name}
                            </NavbarItem>
                        ))}
                    </NavbarSection>
                </Navbar>
            </header>

            {/* The forms would be conditionally rendered here based on currentNav */}
            {currentNav === "Account" && <AccountSettings />}
            {currentNav === "Appearance" && <AppearanceSettings />}
            {currentNav === "Notifications" && <NotificationsSettings />}
            {currentNav === "Billing" && <BillingSettings />}
            {currentNav === "Teams" && <TeamsSettings />}
            {currentNav === "Integrations" && <IntegrationsSettings />}
        </main>
    );
}
