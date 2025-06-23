import type { NextConfig } from 'next'

const config: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8080',
                pathname: '/api/v1/images/**',
                search: '',
            },
        ],
    },
}

export default config