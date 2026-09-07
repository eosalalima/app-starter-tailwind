import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: [
                "localhost:3000",
                "*.app.github.dev",
                "*.github.dev",
            ],
        },
    },
    images: {
        remotePatterns: [
            "plus.unsplash.com",
            "images.unsplash.com",
            "res.cloudinary.com",
            "cdn.pixabay.com",
            "images.pexels.com",
            "tailwindcss.com",
            "randomuser.me",
        ].map((hostname) => ({
            protocol: "https" as const,
            hostname,
            pathname: "/**",
        })),
    },
};

export default nextConfig;
