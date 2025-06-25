import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dk5e2i4r9/**', // ✅ đúng folder bạn dùng trên Cloudinary
      },
    ],
  },
}

export default config;
