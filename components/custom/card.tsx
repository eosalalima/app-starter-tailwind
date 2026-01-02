"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card"
            className={cn(
                "divide-y divide-gray-300 overflow-hidden rounded-lg shadow-lg",
                className
            )}
            {...props}
        />
    );
}

export function CardHeader({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-header"
            className={cn("px-4 py-5 sm:px-6", className)}
            {...props}
        />
    );
}

export function CardTitle({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-title"
            className={cn("leading-none font-semibold", className)}
            {...props}
        />
    );
}

export function CardDescription({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-description"
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    );
}

export function CardAction({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-action"
            className={cn(
                "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
                className
            )}
            {...props}
        />
    );
}

export function CardContent({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-content"
            className={cn("px-4 py-5 sm:p-6", className)}
            {...props}
        />
    );
}

export function CardFooter({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-footer"
            className={cn("px-4 py-4 sm:px-6", className)}
            {...props}
        />
    );
}
