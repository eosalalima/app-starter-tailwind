import type { ReactNode } from "react";
import { Navbar, NavbarItem, NavbarSection } from "@/components/ui-kit/navbar";
import { AppearanceSettings } from "./appearance";
import { AccountSettings } from "./account";
import { NotificationsSettings } from "./notifications";
import { BillingSettings } from "./billing";
import { TeamsSettings } from "./teams";
import { IntegrationSettings } from "./integrations";

const secondaryNavigation = [
    { name: "Account", key: "account" },
    { name: "Appearance", key: "appearance" },
    { name: "Notifications", key: "notifications" },
    { name: "Billing", key: "billing" },
    { name: "Teams", key: "teams" },
    { name: "Integrations", key: "integrations" },
] as const;

type SettingsTab = (typeof secondaryNavigation)[number]["key"];

type SettingsPageProps = {
    searchParams?: Promise<{ tab?: string }>;
};

const settingsContent: Record<SettingsTab, ReactNode> = {
    account: <AccountSettings />,
    appearance: <AppearanceSettings />,
    notifications: <NotificationsSettings />,
    billing: <BillingSettings />,
    teams: <TeamsSettings />,
    integrations: <IntegrationSettings />,
};

export default async function Settings({ searchParams }: SettingsPageProps) {
    const resolvedSearchParams = await searchParams;
    const requestedTab = resolvedSearchParams?.tab?.toLowerCase() ?? "account";
    const currentTab = secondaryNavigation.some((item) => item.key === requestedTab)
        ? (requestedTab as SettingsTab)
        : "account";
    const currentLabel =
        secondaryNavigation.find((item) => item.key === currentTab)?.name ??
        "Account";

    return (
        <main>
            <h1 className="sr-only">{currentLabel} Settings</h1>

            <header className="border-b border-gray-200">
                <Navbar>
                    <NavbarSection>
                        {secondaryNavigation.map((item) => (
                            <NavbarItem
                                key={item.key}
                                href={`?tab=${item.key}`}
                                current={item.key === currentTab}
                            >
                                {item.name}
                            </NavbarItem>
                        ))}
                    </NavbarSection>
                </Navbar>
            </header>

            {settingsContent[currentTab]}
        </main>
    );
}
