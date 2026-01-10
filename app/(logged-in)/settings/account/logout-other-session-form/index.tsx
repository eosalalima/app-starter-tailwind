import { Subheading } from "@/components/ui-kit/heading";
import { Text } from "@/components/ui-kit/text";
import { Field, Fieldset, Label } from "@/components/ui-kit/fieldset";
import { Input } from "@/components/ui-kit/input";
import { Button } from "@/components/ui-kit/button";

export default function LogoutOtherSessionForm() {
    return (
        <>
            <div>
                <Subheading>Log Out Other Sessions</Subheading>
                <Text>
                    Please enter your password to confirm you would like to log
                    out of your other sessions across all of your devices.
                </Text>
            </div>

            <form className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="col-span-full">
                        <Field>
                            <Label>Your Password</Label>
                            <Input id="your-password" name="your_password" />
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
        </>
    );
}
