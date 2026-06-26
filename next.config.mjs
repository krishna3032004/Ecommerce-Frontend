/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.map$/,
      use: 'ignore-loader'
    });
    return config;
  },
  turbopack: {},

  // Java backend ke liye rewrites — frontend ka koi bhi /api/* call
  // seedha Java backend pe forward ho jayega
  async rewrites() {
    const JAVA_BACKEND_URL = process.env.NEXT_PUBLIC_JAVA_BACKEND_URL || "http://localhost:8080";
    return [
      {
        source: "/api/getProductByLink",
        destination: `${JAVA_BACKEND_URL}/api/getProductByLink`,
      },
      {
        source: "/api/search",
        destination: `${JAVA_BACKEND_URL}/api/search`,
      },
      {
        source: "/api/trending-products",
        destination: `${JAVA_BACKEND_URL}/api/trending-products`,
      },
      {
        source: "/api/price-alert",
        destination: `${JAVA_BACKEND_URL}/api/price-alert`,
      },
      {
        source: "/api/update-prices",
        destination: `${JAVA_BACKEND_URL}/api/update-prices`,
      },
    ];
  },
};

export default nextConfig;
