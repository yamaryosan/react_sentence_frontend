# 第一ステージ: Reactアプリのビルド
FROM --platform=linux/amd64 node:alpine AS build

# 作業ディレクトリを作成
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# Reactアプリをビルド
RUN npm run build

# 第二ステージ: Nginxで静的ファイルを提供
FROM --platform=linux/amd64 nginx:alpine

# Nginxのデフォルト設定を削除
RUN rm -rf /usr/share/nginx/html/*

# Reactアプリのビルドファイルをコピー
COPY --from=build /app/build /usr/share/nginx/html

# カスタムNginx設定をコピー
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Nginxのポートをエクスポーズ
EXPOSE 80

# Nginxを起動
CMD ["nginx", "-g", "daemon off;"]