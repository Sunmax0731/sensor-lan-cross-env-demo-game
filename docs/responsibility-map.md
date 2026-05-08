# 責務分割

- game-loop: センサー・LAN・クロス環境技術デモゲーム の closed alpha 検証責務。
- network-simulator: センサー・LAN・クロス環境技術デモゲーム の closed alpha 検証責務。
- web-game: センサー・LAN・クロス環境技術デモゲーム の closed alpha 検証責務。
- scenario-validator: センサー・LAN・クロス環境技術デモゲーム の closed alpha 検証責務。

共通: `src/core` が評価ロジック、`src/validators` が代表シナリオ検証、`src/report` が証跡生成、`src/web` がブラウザ表示を担当する。
