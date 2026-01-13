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
        domains: [
            "plus.unsplash.com",
            "images.unsplash.com",
            "res.cloudinary.com",
            "cdn.pixabay.com",
            "images.pexels.com",
            "tailwindcss.com",
            "randomuser.me",
        ],
    },
};

export default nextConfig;
