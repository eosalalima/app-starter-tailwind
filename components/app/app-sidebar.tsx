"use client";

import { useState, useEffect } from "react";
import { Avatar } from "../ui-kit/avatar";

interface RandomUser {
    results?: Array<{
        picture?: {
            thumbnail?: string;
        };
        name?: {
            first?: string;
            last?: string;
        };
        email?: string;
    }>;
}
import {
    Dropdown,
    DropdownButton,
    DropdownMenu,
    DropdownItem,
    DropdownLabel,
    DropdownDivider,
} from "../ui-kit/dropdown";
import {
    SidebarHeader,
    SidebarItem,
    SidebarLabel,
    SidebarSection,
    SidebarBody,
    SidebarSpacer,
    SidebarFooter,
    Sidebar,
} from "../ui-kit/sidebar";
import {
    ArrowRightStartOnRectangleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    Cog6ToothIcon,
    Cog8ToothIcon,
    HomeIcon,
    InboxIcon,
    LightBulbIcon,
    MagnifyingGlassIcon,
    MegaphoneIcon,
    PlusIcon,
    QuestionMarkCircleIcon,
    ShieldCheckIcon,
    SparklesIcon,
    Square2StackIcon,
    TicketIcon,
    UserIcon,
} from "@heroicons/react/20/solid";
import LogoutMenuItem from "./logout-menu-item";
import { Heading } from "../ui-kit/heading";

const menuItems = {
    headerMenuItems: [
        { label: "Search", icon: MagnifyingGlassIcon, href: "/search" },
        { label: "Inbox", icon: InboxIcon, href: "/inbox" },
    ],
    bodyMenuItems: {
        primary: [
            { label: "Home", icon: HomeIcon, href: "/home" },
            { label: "Events", icon: Square2StackIcon, href: "/events" },
            { label: "Orders", icon: TicketIcon, href: "/orders" },
            { label: "Broadcasts", icon: MegaphoneIcon, href: "/broadcasts" },
            { label: "Settings", icon: Cog6ToothIcon, href: "/settings" },
        ],
        secondary: [
            {
                label: "Support",
                icon: QuestionMarkCircleIcon,
                href: "/support",
            },
            { label: "Changelog", icon: SparklesIcon, href: "/changelog" },
        ],
    },
    footerMenuItems: [
        { label: "My profile", icon: UserIcon, href: "/my-profile" },
        { label: "Settings", icon: Cog8ToothIcon, href: "/settings" },
        {
            label: "Privacy policy",
            icon: ShieldCheckIcon,
            href: "/privacy-policy",
        },
        {
            label: "Share feedback",
            icon: LightBulbIcon,
            href: "/share-feedback",
        },
        {
            label: "Sign Out",
            icon: ArrowRightStartOnRectangleIcon,
            href: "/logout",
        },
    ],
};

export function AppSidebar() {
    const [randomUser, setRandomUser] = useState<RandomUser | null>(null);

    useEffect(() => {
        fetch("https://randomuser.me/api/")
            .then((res) => res.json())
            .then((data) => setRandomUser(data));
    }, []);

    return (
        <Sidebar>
            <SidebarHeader>
                <Avatar src="/app-logo.png" className="size-10" />
                <Heading>Synergy Tech</Heading>
            </SidebarHeader>
            <SidebarBody>
                <SidebarSection>
                    {menuItems.bodyMenuItems.primary.map((item) => (
                        <SidebarItem key={item.href} href={item.href}>
                            <item.icon />
                            <SidebarLabel>{item.label}</SidebarLabel>
                        </SidebarItem>
                    ))}
                </SidebarSection>
                <SidebarSpacer />
                <SidebarSection>
                    {menuItems.bodyMenuItems.secondary.map((item) => (
                        <SidebarItem key={item.href} href={item.href}>
                            <item.icon />
                            <SidebarLabel>{item.label}</SidebarLabel>
                        </SidebarItem>
                    ))}
                </SidebarSection>
            </SidebarBody>
            <SidebarFooter>
                <Dropdown>
                    <DropdownButton as={SidebarItem}>
                        <span className="flex min-w-0 items-center gap-3">
                            <Avatar
                                src={
                                    randomUser?.results?.[0]?.picture?.thumbnail
                                }
                                className="size-10"
                                square
                                alt=""
                            />
                            <span className="min-w-0">
                                <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                                    {randomUser?.results?.[0]?.name?.first}{" "}
                                    {randomUser?.results?.[0]?.name?.last}
                                </span>
                                <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                                    {randomUser?.results?.[0]?.email}
                                </span>
                            </span>
                        </span>
                        <ChevronUpIcon />
                    </DropdownButton>
                    <DropdownMenu className="min-w-64" anchor="top start">
                        {menuItems.footerMenuItems.map((item, index) => (
                            <>
                                {item.label === "Sign Out" ? (
                                    <LogoutMenuItem
                                        key={item.href}
                                        item={item}
                                    />
                                ) : (
                                    <DropdownItem
                                        key={item.href}
                                        href={item.href}
                                    >
                                        <item.icon />
                                        <DropdownLabel>
                                            {item.label}
                                        </DropdownLabel>
                                    </DropdownItem>
                                )}

                                {index % 2 === 1 && (
                                    <DropdownDivider key={`divider-${index}`} />
                                )}
                            </>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </SidebarFooter>
        </Sidebar>
    );
}
