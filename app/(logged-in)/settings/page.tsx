import { Button } from "@/components/ui-kit/button";
import { Field, Fieldset, Label } from "@/components/ui-kit/fieldset";
import { Subheading } from "@/components/ui-kit/heading";
import { Input } from "@/components/ui-kit/input";
import { Navbar, NavbarItem, NavbarSection } from "@/components/ui-kit/navbar";
import { Text } from "@/components/ui-kit/text";
import Image from "next/image";
import { auth } from "@/auth";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import db from "@/db/drizzle";
import TwoFactorAuthForm from "./two-factor-auth-form";
import ChangePasswordForm from "./change-password-form";

const secondaryNavigation = [
    { name: "Account", href: "#", current: true },
    { name: "Notifications", href: "#", current: false },
    { name: "Billing", href: "#", current: false },
    { name: "Teams", href: "#", current: false },
    { name: "Integrations", href: "#", current: false },
];

export default async function Settings() {
    const session = await auth();

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
                            <NavbarItem key={item.name}>{item.name}</NavbarItem>
                        ))}
                    </NavbarSection>
                </Navbar>
            </header>

            {/* Settings forms */}
            <div className="divide-y divide-gray-200">
                {/* Personal Information */}
                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <Subheading>Personal Information</Subheading>
                        <Text>
                            Use a permanent address where you can receive mail.
                        </Text>
                    </div>

                    <form className="md:col-span-2">
                        <Fieldset>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                <div className="col-span-full flex items-center gap-x-8">
                                    <Image
                                        alt=""
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        className="size-24 flex-none rounded-lg bg-gray-100 object-cover outline -outline-offset-1 outline-black/5"
                                        width={96}
                                        height={96}
                                    />
                                    <div>
                                        <Button color="indigo">
                                            Change avatar
                                        </Button>
                                        <Text>JPG, GIF or PNG. 1MB max.</Text>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <Field>
                                        <Label>First Name</Label>
                                        <Input
                                            id="first-name"
                                            name="first-name"
                                        />
                                    </Field>
                                </div>

                                <div className="sm:col-span-3">
                                    <Field>
                                        <Label>Last Name</Label>
                                        <Input
                                            id="last-name"
                                            name="last-name"
                                        />
                                    </Field>
                                </div>

                                <div className="col-span-full">
                                    <Field>
                                        <Label>Email Address</Label>
                                        <Input id="email" name="email" />
                                    </Field>
                                </div>

                                <div className="col-span-full">
                                    <Field>
                                        <Label>Username</Label>
                                        <Input id="username" name="username" />
                                    </Field>
                                </div>

                                <div className="col-span-full">
                                    <Field>
                                        <Label>Timezone</Label>
                                        <Input id="timezone" name="timezone" />
                                    </Field>
                                </div>
                            </div>
                        </Fieldset>

                        <div className="mt-8 flex">
                            <Button
                                type="submit"
                                color="indigo"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Change Password */}
                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <Subheading>Change Password</Subheading>
                        <Text>
                            Update your password associated with your account.
                        </Text>
                    </div>

                    <ChangePasswordForm />
                </div>

                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <Subheading>Toggle OTP</Subheading>
                        <Text>
                            Enable/Disable One-Time Password (OTP)
                            authentication
                        </Text>
                    </div>

                    <TwoFactorAuthForm
                        twoFactorActivated={
                            user?.twoFactorAuthActivated ?? false
                        }
                    />
                </div>

                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <Subheading>Log Out Other Sessions</Subheading>
                        <Text>
                            Please enter your password to confirm you would like
                            to log out of your other sessions across all of your
                            devices.
                        </Text>
                    </div>

                    <form className="md:col-span-2">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                            <div className="col-span-full">
                                <Field>
                                    <Label>Your Password</Label>
                                    <Input
                                        id="your-password"
                                        name="your_password"
                                    />
                                </Field>
                            </div>
                        </div>

                        <div className="mt-8 flex">
                            <Button
                                type="submit"
                                color="indigo"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Log out other sessions
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Delete Account */}
                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <div>
                        <Subheading>Delete Account</Subheading>
                        <Text>
                            No longer want to use our service? You can delete
                            your account here. This action is not reversible.
                            All information related to this account will be
                            deleted permanently.
                        </Text>
                    </div>

                    <form className="flex items-start md:col-span-2">
                        <button
                            type="submit"
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500"
                        >
                            Yes, delete my account
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
