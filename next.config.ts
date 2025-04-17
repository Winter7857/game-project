/** @type {import('next').NextConfig} */
const nextConfig = {
  // your other config...
};

module.exports = nextConfig;

module.exports.config = {
  matcher: ["/admin/:path*", "/admin"],
};
