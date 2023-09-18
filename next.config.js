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
    }
}

module.exports = nextConfig
