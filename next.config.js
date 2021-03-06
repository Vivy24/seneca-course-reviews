/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['src'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
};
