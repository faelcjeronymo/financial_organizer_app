/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ["@untitledui/icons"],
    },
    allowedDevOrigins: ['127.0.0.1', '192.168.0.8']
};

export default nextConfig;
