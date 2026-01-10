"use client";

import { useState } from "react";
import { Navbar, NavbarItem, NavbarSection } from "@/components/ui-kit/navbar";
import { AppearanceSettings } from "./appearance";
import { AccountSettings } from "./account";
import { NotificationsSettings } from "./notifications";
import { BillingSettings } from "./billing";
import { TeamsSettings } from "./teams";
import { IntegrationsSettings } from "./integrations";

const secondaryNavigation = [
    { name: "Account", href: "#" },
    { name: "Appearance", href: "#" },
    { name: "Notifications", href: "#" },
    { name: "Billing", href: "#" },
    { name: "Teams", href: "#" },
    { name: "Integrations", href: "#" },
];

export default function Settings() {
    const [currentNav, setCurrentNav] = useState("Account");

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
