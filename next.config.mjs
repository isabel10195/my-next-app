/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'sjc.microlink.io',
      },
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com', // Nuevo dominio agregado
      },
      {
        protocol: "https",
        hostname: "blog.postman.com",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com", // 🔥 Agregado dominio de Imgur
      },
    ],
  },
};

export default nextConfig;
