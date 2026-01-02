"use client";

import { DropdownItem, DropdownLabel } from "@/components/ui-kit/dropdown";
import { logout } from "./actions";

export default function LogoutMenuItem({
    item,
}: {
    item: { label: string; icon: React.ElementType; href: string };
}) {
    return (
        <DropdownItem
            onClick={async () => {
                await logout();
                window.location.href = "/";
            }}
        >
            <item.icon />
            <DropdownLabel>{item.label}</DropdownLabel>
        </DropdownItem>
    );
}
