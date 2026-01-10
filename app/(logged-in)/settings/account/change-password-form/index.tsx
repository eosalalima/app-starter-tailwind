"use client";

import { Field, Label } from "@/components/ui-kit/fieldset";
import { Input } from "@/components/ui-kit/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/custom/form";
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { passwordSchema } from "@/validation/passwordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { ChangePassword } from "./actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui-kit/button";
import { FormMessage } from "@/components/custom/form";

const formSchema = z
    .object({
        currentPassword: passwordSchema,
    })
    .and(passwordMatchSchema);

export default function ChangePasswordForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentPassword: "",
            password: "",
            confirmPassword: "",
        },
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        const response = await ChangePassword({
            currentPassword: data.currentPassword,
            password: data.password,
            passwordConfirm: data.confirmPassword,
        });

        if (response?.error) {
            form.setError("root", { message: response.message });
        } else {
            toast.success("Password changed successfully!");
            form.reset();
            redirect("/settings");
        }

        console.log(response);
    };

    return (
        <Form {...form}>
            <form
                className="md:col-span-2"
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <fieldset
                    disabled={form.formState.isSubmitting}
                    className="flex flex-col gap-4"
                >
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl className="mt-3">
                                    <Input {...field} type="password" />
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
                                <FormLabel className="mt-4">Password</FormLabel>
                                <FormControl className="mt-3">
                                    <Input {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mt-4">
                                    Confirm Password
                                </FormLabel>
                                <FormControl className="mt-3">
                                    <Input {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {!!form.formState.errors.root?.message && (
                        <FormMessage>
                            {form.formState.errors.root?.message}
                        </FormMessage>
                    )}
                    <div className="mt-8 flex">
                        <Button
                            type="submit"
                            color="indigo"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Change Password
                        </Button>
                    </div>
                </fieldset>
            </form>
        </Form>
    );
}
