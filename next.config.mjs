import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Permitir importar archivos .mdx
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

export default withNextIntl(nextConfig);
