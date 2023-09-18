/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: true,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "i.annihil.us"
            }
        ]
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
