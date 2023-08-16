/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.USE_DOCKER === true ? 'standalone' : undefined
}

module.exports = nextConfig
