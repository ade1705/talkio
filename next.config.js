/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['localhost', "www.chatbot.com", "faces-img.xcdn.link"],
  },
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: false,

  // Uncoment to add domain whitelist
  // images: {
  //   domains: [
  //     'res.cloudinary.com',
  //   ],
  // },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};
