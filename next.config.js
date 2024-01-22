// noinspection SpellCheckingInspection

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',

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
