/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "localhost",
      "0.0.0.0",
      "127.0.0.1",
      process.env.NEXT_PUBLIC_SERVER.match(/(http(?:s)?:\/\/)(.*)/)[2],
      `www.${process.env.NEXT_PUBLIC_SERVER.match(/(http(?:s)?:\/\/)(.*)/)[2]}`,
      "str.andrewnageh.com",
      "www.str.andrewnageh.com"
    ],
  },
}

module.exports = nextConfig
