import { Subheading } from "@/components/ui-kit/heading";
import { Field, Fieldset, Label } from "@/components/ui-kit/fieldset";
import { Button } from "@/components/ui-kit/button";
import { Input } from "@/components/ui-kit/input";
import { Text } from "@/components/ui-kit/text";
import Image from "next/image";

export default function PersonalInformationForm() {
    return (
        <>
            <div>
                <Subheading>Personal Information</Subheading>
                <Text>Use a permanent address where you can receive mail.</Text>
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
                                <Button color="indigo">Change avatar</Button>
                                <Text>JPG, GIF or PNG. 1MB max.</Text>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <Field>
                                <Label>First Name</Label>
                                <Input id="first-name" name="first-name" />
                            </Field>
                        </div>

                        <div className="sm:col-span-3">
                            <Field>
                                <Label>Last Name</Label>
                                <Input id="last-name" name="last-name" />
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
        </>
    );
}
