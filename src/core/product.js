export const product = {
  "repo": "sensor-lan-cross-env-demo-game",
  "domain": "Game",
  "rank": 67,
  "tier": "P3",
  "score": 49,
  "ideaNo": 6,
  "ideaName": "センサー・LAN・クロス環境技術デモゲーム",
  "field": "ゲーム・技術デモ",
  "publicTarget": "GitHub Pages / GitHub Release",
  "overview": "センサー、LAN、ブラウザ環境差をミニゲームとして確認する。",
  "problem": "技術デモとしては有用だが、遊びとしての完成度を作るには調整が多い。",
  "differentiation": "ホスト、センサー、フォールバック入力を同じ検証シナリオで扱う。",
  "audience": "LAN内デバイス連携をゲーム形式で確認したい開発者",
  "requiredInputs": [
    "hostId",
    "sensorPacket",
    "latencyMs",
    "fallbackMode"
  ],
  "modules": [
    "game-loop",
    "balancer",
    "web-game",
    "scenario-validator"
  ],
  "accent": "#0f766e",
  "secondary": "#8b5cf6",
  "scenarioNouns": [
    "LANホスト",
    "センサー入力",
    "フォールバック"
  ]
};

export function evaluateScenario(scenario) {
  if (scenario.type === "mixed-batch") {
    const results = (scenario.items || []).map((inputs, index) => evaluateScenario({ id: scenario.id + "-" + index, inputs, flags: index === 2 ? ["needsReview"] : [] }));
    const accepted = results.filter((r) => r.status !== "error").length;
    const warnings = results.filter((r) => r.status !== "pass").length;
    return { id: scenario.id, status: warnings ? "warning" : "pass", accepted, warnings, missing: results.flatMap((r) => r.missing), score: warnings ? 78 : 96 };
  }
  const inputs = scenario.inputs || {};
  const missing = product.requiredInputs.filter((key) => inputs[key] === undefined || inputs[key] === null || inputs[key] === "");
  if (missing.length) return { id: scenario.id, status: "error", accepted: 0, warnings: 0, missing, score: 0 };
  const risky = Object.values(inputs).some((v) => /stale|low|noisy|manual-lock|large-water-change|late-brake|unknown/i.test(String(v)));
  const warnings = (scenario.flags || []).includes("needsReview") || risky ? 1 : 0;
  return { id: scenario.id, status: warnings ? "warning" : "pass", accepted: 1, warnings, missing: [], score: warnings ? 86 : 96 };
}

export function summarizeProduct() {
  return { name: product.ideaName, repo: product.repo, releaseTarget: product.publicTarget, responsibilities: product.modules, requiredInputs: product.requiredInputs };
}
