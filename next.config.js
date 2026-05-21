// noinspection SpellCheckingInspection

/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    // fallback: 'blocking',
    // trailingSlash: true,

    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.broadcast.radio',
                port: '',
                pathname: "/api/image/**"
            },
        ],
    },
}

module.exports = nextConfig
