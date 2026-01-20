# Routrace

日本の高速道路を地図上で可視化するWebアプリケーションです。

## 機能

- 高速道路の路線を地図上に表示
- 複数路線の選択・表示切り替え
- 日本の海岸線の表示/非表示
- 地図画像のエクスポート
- モバイル対応のレスポンシブデザイン

## 技術スタック

- **フレームワーク**: React 18 + TypeScript
- **ビルドツール**: Vite
- **UIライブラリ**: shadcn/ui + Tailwind CSS
- **地図**: Leaflet / react-leaflet
- **状態管理**: React Query
- **ルーティング**: React Router
- **テスト**: Vitest

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## スクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | 本番用ビルド |
| `npm run preview` | ビルド結果のプレビュー |
| `npm run lint` | ESLintによるコードチェック |
| `npm run test` | テストの実行 |
| `npm run test:watch` | テストをウォッチモードで実行 |

## データソース

地図データは [routrace-data](https://github.com/ponkotuy/routrace-data) から取得しています。

## ライセンス

地図データは OpenStreetMap contributors のデータを使用しています。
