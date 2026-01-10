import { Subheading } from "@/components/ui-kit/heading";
import { Text } from "@/components/ui-kit/text";
import TwoFactorAuthForm from "./two-factor-auth-form";
import ChangePasswordForm from "./change-password-form";
import PersonalInformationForm from "./personal-information-form/page";
import LogoutOtherSessionForm from "./logout-other-session-form/page";
import DeleteAccountForm from "./delete-account-form/page";

export async function AccountSettings() {
    return (
        <main>
            <h1 className="sr-only">Account Settings</h1>

            {/* Account Setting Forms */}
            <div className="divide-y divide-gray-200">
                {/* Personal Information */}
                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <PersonalInformationForm />
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

                {/* Two-Factor Authentication */}
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

                {/* Log Out Other Sessions */}
                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <LogoutOtherSessionForm />
                </div>

                {/* Delete Account */}
                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                    <DeleteAccountForm />
                </div>
            </div>
        </main>
    );
}
