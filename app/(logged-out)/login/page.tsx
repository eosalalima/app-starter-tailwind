import { Card, CardContent } from "@/components/custom/card";
import { AuthLayout } from "@/components/ui-kit/auth-layout";
import { Button } from "@/components/ui-kit/button";
import { Checkbox, CheckboxField } from "@/components/ui-kit/checkbox";
import { Field, Label } from "@/components/ui-kit/fieldset";
import { Input } from "@/components/ui-kit/input";
import { Heading } from "@/components/ui-kit/heading";
import { Strong, Text, TextLink } from "@/components/ui-kit/text";
import Image from "next/image";

export default function Login() {
    return (
        <AuthLayout>
            <Card className="w-100">
                <CardContent className="flex flex-col items-center justify-center">
                    <form
                        action="#"
                        method="POST"
                        className="grid w-full max-w-sm grid-cols-1 gap-8"
                    >
                        <Image
                            alt=""
                            src="/app-logo.png"
                            className="h-auto w-12 md:w-16 lg:w-18"
                            width={128}
                            height={128}
                        />
                        <Heading>Sign in to your account</Heading>
                        <Field>
                            <Label>Email</Label>
                            <Input type="email" name="email" />
                        </Field>
                        <Field>
                            <Label>Password</Label>
                            <Input type="password" name="password" />
                        </Field>
                        <div className="flex items-center justify-between">
                            <CheckboxField>
                                <Checkbox name="remember" />
                                <Label>Remember me</Label>
                            </CheckboxField>
                            <Text>
                                <TextLink href="#">
                                    <Strong>Forgot password?</Strong>
                                </TextLink>
                            </Text>
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <Text>
                            Don’t have an account?{" "}
                            <TextLink href="#">
                                <Strong>Sign up</Strong>
                            </TextLink>
                        </Text>
                    </form>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}
