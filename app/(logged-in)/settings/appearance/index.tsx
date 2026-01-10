import { ThemeForm } from "./theme-form";

export function AppearanceSettings() {
    return (
        <main>
            <h1 className="sr-only">Appearance Settings</h1>

            {/* Appearance Setting Forms */}
            <div className="divide-y divide-gray-200">
                {/* Theme */}
                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <ThemeForm />
                </div>
            </div>
        </main>
    );
}
