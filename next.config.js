/** @type {import('next').NextConfig} */
const nextConfig = {
     reactStrictMode: true,
     images: {
          domains: ["kirbiecravings.com"],
     },
     swcMinify: true,
};

module.exports = nextConfig;
