// noinspection SpellCheckingInspection

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
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
