const { i18n } = require('./next-i18next.config')

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Add more headers if needed
];

const nextConfig = {
  reactStrictMode: false,
  distDir: 'dist',
  swcMinify: false,
  i18n,
  images: {
    domains: ['ms-images.s3.ap-southeast-1.amazonaws.com', 'd1irpg7po1rqdm.cloudfront.net', 'd3f7pvozodla0f.cloudfront.net', 'staging.merisehat.pk', 'cmsapi.merisehat.pk', 'play-lh.googleusercontent.com', 's.rozee.pk', 'reporting.essalab.tech', "ms-images-staging.s3.ap-southeast-1.amazonaws.com", "portal.merisehat.pk"],
  },
}

module.exports = {
  ...nextConfig,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,

      },
      {
        source: '/',
        headers: securityHeaders,

      },
    ];
  },
}
