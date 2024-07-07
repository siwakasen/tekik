/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // This disables ESLint during both development and production builds.
        ignoreDuringBuilds: true,
        // You can add more configurations here if needed
    },
};

export default nextConfig;
