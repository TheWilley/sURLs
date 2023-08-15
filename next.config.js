/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: process.env.BASE_URL
    },
    output: process.env.USE_DOCKER === true ? 'standalone' : undefined
}

module.exports = nextConfig
