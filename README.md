# センサー・LAN・クロス環境技術デモゲーム

sensor-lan-cross-env-demo-game は、NON PICKUP 優先リスト Rank 67 / Game No.6 から昇格した closed alpha プロダクトです。センサー、LAN、ブラウザ環境差をミニゲームとして確認する。

## Quick Start

```powershell
cd D:\AI\Game\sensor-lan-cross-env-demo-game
npm test
npm run cli
```

## Closed Alpha Scope

- 公開想定: GitHub Pages / GitHub Release
- 対象ユーザー: LAN内デバイス連携をゲーム形式で確認したい開発者
- 手動テスト: Codex側では未実施。手順は `docs/manual-test.md` と `docs/strict-manual-test-addendum.md` に記載

## Architecture

- `src/core`: プロダクト定義と代表シナリオ評価
- `src/validators`: representative suite と期待結果の検証
- `src/report`: validation result、web smoke、QCDS metrics、deterministic docs ZIP の生成
- `src/review-model`: QCDS 評価モデル
- `src/cli`: CLI 検証入口
- `src/web`: 静的Web表示と主要操作
- `src/game`: game loop と balancing の境界

## Release Artifacts

- `dist/sensor-lan-cross-env-demo-game-docs.zip`
- `dist/validation-result.json`
- `dist/web-smoke-result.json`
- `docs/release-evidence.json`
