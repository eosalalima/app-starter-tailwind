import { AuthLayout } from "@/components/ui-kit/auth-layout";
import { Form, useForm } from "react-hook-form";
import { passwordReset } from "./actions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/custom/card";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/custom/form";
import { Input } from "@/components/ui-kit/input";
import { Button } from "@/components/ui-kit/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export default function PasswordReset() {
    const searchParams = useSearchParams();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: decodeURIComponent(searchParams.get("email") ?? ""),
        },
    });
    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        await passwordReset(data.email);
    };

    return (
        <AuthLayout>
            {form.formState.isSubmitSuccessful ? (
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Email Sent</CardTitle>
                    </CardHeader>
                    <CardContent>
                        If you have an account with the provided email (
                        {form.getValues("email")}), you will receive
                        instructions to reset your password.
                    </CardContent>
                </Card>
            ) : (
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Password Reset</CardTitle>
                        <CardDescription>
                            Enter your email address to reset your password.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)}>
                                <fieldset
                                    disabled={form.formState.isSubmitting}
                                    className="flex flex-col gap-4"
                                >
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

                                    {form.formState.errors.root && (
                                        <FormMessage>
                                            {form.formState.errors.root.message}
                                        </FormMessage>
                                    )}

                                    <Button type="submit">Submit</Button>
                                </fieldset>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <div>
                            Remember your password?{" "}
                            <Link href="/login" className="underline">
                                Login
                            </Link>
                        </div>
                        <div>
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="underline">
                                Register
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            )}
        </AuthLayout>
    );
}
