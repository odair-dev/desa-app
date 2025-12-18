/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações para otimização e desenvolvimento
  eslint: {
    // Permite que builds sejam executados mesmo com erros de ESLint
    ignoreDuringBuilds: false,
  },
  // Configurações para ambiente de desenvolvimento
  ...(process.env.NODE_ENV === 'development' && {
    // Habilita fast refresh para melhor experiência de desenvolvimento
    reactStrictMode: true,
  }),
}

module.exports = nextConfig
