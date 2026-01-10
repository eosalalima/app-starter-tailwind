"use client";

import { useEffect, useMemo, useState } from "react";
import { Subheading } from "@/components/ui-kit/heading";
import { Field, Fieldset, Label } from "@/components/ui-kit/fieldset";
import { Text } from "@/components/ui-kit/text";
import {
    Combobox,
    ComboboxLabel,
    ComboboxOption,
} from "@/components/ui-kit/combobox";

const themes = [
    { id: "light", name: "Light" },
    { id: "dark", name: "Dark" },
    { id: "system", name: "System Default" },
];

const STORAGE_KEY = "app-theme";

export function ThemeForm() {
    const [selectedThemeId, setSelectedThemeId] = useState("light");
    const selectedTheme = useMemo(
        () => themes.find((theme) => theme.id === selectedThemeId) ?? themes[0],
        [selectedThemeId],
    );

    useEffect(() => {
        const storedTheme = window.localStorage.getItem(STORAGE_KEY);
        if (storedTheme && themes.some((theme) => theme.id === storedTheme)) {
            setSelectedThemeId(storedTheme);
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        root.dataset.theme = selectedThemeId;
        window.localStorage.setItem(STORAGE_KEY, selectedThemeId);

        const applyTheme = (isDark: boolean) => {
            root.classList.toggle("dark", isDark);
            root.classList.toggle("light", !isDark);
        };

        if (selectedThemeId === "system") {
            const mediaQuery = window.matchMedia(
                "(prefers-color-scheme: dark)",
            );
            applyTheme(mediaQuery.matches);

            const handleChange = (event: MediaQueryListEvent) => {
                applyTheme(event.matches);
            };

            mediaQuery.addEventListener("change", handleChange);
            return () => mediaQuery.removeEventListener("change", handleChange);
        }

        applyTheme(selectedThemeId === "dark");
    }, [selectedThemeId]);

    return (
        <>
            <div>
                <Subheading>Theme</Subheading>
                <Text>Set your preferred theme for the application.</Text>
            </div>

            <form className="md:col-span-2">
                <Fieldset>
                    <div className="sm:col-span-3">
                        <Field>
                            <Label>Theme</Label>
                            <Combobox
                                name="themes"
                                options={themes}
                                displayValue={(theme) => theme?.name}
                                value={selectedTheme}
                                onChange={(theme) =>
                                    setSelectedThemeId(theme.id)
                                }
                            >
                                {(theme) => (
                                    <ComboboxOption value={theme}>
                                        <ComboboxLabel>
                                            {theme.name}
                                        </ComboboxLabel>
                                    </ComboboxOption>
                                )}
                            </Combobox>
                        </Field>
                    </div>
                </Fieldset>
            </form>
        </>
    );
}
