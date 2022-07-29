/** @type {import('next').NextConfig} */
const nextConfig = {
     reactStrictMode: true,
     images: {
          domains: ["via.placeholder.com", "media.us1.twilio.com"],
     },
     swcMinify: true,
};

module.exports = nextConfig;
