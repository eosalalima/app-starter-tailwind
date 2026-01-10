import { Subheading } from "@/components/ui-kit/heading";
import { Text } from "@/components/ui-kit/text";

export default function DeleteAccountForm() {
    return (
        <>
            <div>
                <Subheading>Delete Account</Subheading>
                <Text>
                    No longer want to use our service? You can delete your
                    account here. This action is not reversible. All information
                    related to this account will be deleted permanently.
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
        </>
    );
}
