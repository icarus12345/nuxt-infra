import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: false,
  // distDir: 'dist',
  // outDir: 'out',
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
  // async redirects() {
  //   return [
  //     {
  //       source: '/home',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
