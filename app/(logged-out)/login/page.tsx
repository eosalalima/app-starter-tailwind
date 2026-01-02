"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/dist/client/components/navigation";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/custom/card";
import { AuthLayout } from "@/components/ui-kit/auth-layout";
import { Button } from "@/components/ui-kit/button";
import { Checkbox, CheckboxField } from "@/components/ui-kit/checkbox";
import { Fieldset, Label } from "@/components/ui-kit/fieldset";
import { Input } from "@/components/ui-kit/input";
import { Heading } from "@/components/ui-kit/heading";
import { Strong, Text, TextLink } from "@/components/ui-kit/text";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from "@/components/custom/input-otp";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/custom/form";

import { passwordSchema } from "@/validation/passwordSchema";
import { loginWithCredentials, preLoginCheck } from "./actions";
import Link from "next/link";

const formSchema = z.object({
    email: z.email("Invalid email address"),
    password: passwordSchema,
});

export default function Login() {
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState("");
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        const preLoginCheckResponse = await preLoginCheck({
            email: data.email,
            password: data.password,
        });

        if (preLoginCheckResponse?.error) {
            form.setError("root", {
                message: preLoginCheckResponse.message,
            });
            return;
        }

        if (preLoginCheckResponse?.twoFactorActivated) {
            setStep(2);
        } else {
            const response = await loginWithCredentials({
                email: data.email,
                password: data.password,
            });

            if (response?.error) {
                form.setError("root", {
                    message: response.message,
                });
            } else {
                router.push("/home");
            }
        }
    };

    const email = form.watch("email");

    const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await loginWithCredentials({
            email: form.getValues("email"),
            password: form.getValues("password"),
            token: otp,
        });

        if (response?.error) {
            toast.error(response.message);
            return;
        } else {
            router.push("/home");
        }
    };

    return (
        <AuthLayout>
            {step === 1 && (
                <Card className="w-100 border border-gray-300 dark:border-gray-700">
                    <CardContent className="flex flex-col items-center justify-center">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSubmit)}
                                className="grid w-full max-w-sm grid-cols-1 gap-8"
                            >
                                <Fieldset
                                    disabled={form.formState.isSubmitting}
                                    className="flex flex-col gap-4"
                                >
                                    <Image
                                        alt=""
                                        src="/app-logo.png"
                                        className="h-auto w-12 md:w-16 lg:w-18"
                                        width={128}
                                        height={128}
                                    />

                                    <Heading>Sign in to your account</Heading>

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="email"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="password"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex flex-col items-center justify-between gap-2">
                                        <CheckboxField>
                                            <Checkbox name="remember" />
                                            <Label>Remember me</Label>
                                        </CheckboxField>
                                    </div>

                                    {form.formState.errors.root && (
                                        <FormMessage>
                                            {form.formState.errors.root.message}
                                        </FormMessage>
                                    )}

                                    <Button type="submit" className="w-full">
                                        Login
                                    </Button>

                                    <Text>
                                        Forgot password?{" "}
                                        <Link
                                            href={`/password-reset${
                                                email
                                                    ? `?email=${encodeURIComponent(
                                                          email
                                                      )}`
                                                    : ""
                                            }`}
                                            className="text-primary underline"
                                        >
                                            <Strong>Reset my password</Strong>
                                        </Link>
                                    </Text>

                                    <Text>
                                        Don&apos;t have an account?{" "}
                                        <Link
                                            href="/register"
                                            className="text-primary underline"
                                        >
                                            <Strong>Register</Strong>
                                        </Link>
                                    </Text>
                                </Fieldset>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            )}
            {step === 2 && (
                <Card className="w-100 border border-gray-300 dark:border-gray-700">
                    <CardContent className="flex flex-col items-center justify-center">
                        <form
                            onSubmit={handleOTPSubmit}
                            className="gflex flex-col gap-2"
                        >
                            <Fieldset
                                disabled={form.formState.isSubmitting}
                                className="flex flex-col gap-4"
                            >
                                <Image
                                    alt=""
                                    src="/app-logo.png"
                                    className="h-auto w-12 md:w-16 lg:w-18"
                                    width={128}
                                    height={128}
                                />

                                <Heading>One-Time Passcode</Heading>

                                <InputOTP
                                    className="mt-3"
                                    maxLength={6}
                                    value={otp}
                                    onChange={setOtp}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={otp.length !== 6}
                                >
                                    Verify OTP
                                </Button>

                                <Text>
                                    Don’t have an account?{" "}
                                    <TextLink href="#">
                                        <Strong>Sign up</Strong>
                                    </TextLink>
                                </Text>
                            </Fieldset>
                        </form>
                    </CardContent>
                </Card>
            )}
        </AuthLayout>
    );
}
