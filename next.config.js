/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 静的サイトとして書き出すための設定
  basePath: '/if-ken.com', // GitHubのリポジトリ名を / で始めて書く
  images: {
    unoptimized: true, // GitHub Pagesで画像を表示させるために必要
  },
};

module.exports = nextConfig;