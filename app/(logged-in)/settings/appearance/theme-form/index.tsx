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

export function ThemeForm() {
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
                                defaultValue={themes[0]}
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
