export const product = {
  "repo": "sensor-lan-cross-env-demo-game",
  "domain": "Game",
  "rank": 67,
  "tier": "P3",
  "score": 49,
  "ideaNo": 6,
  "ideaName": "センサー・LAN・クロス環境技術デモゲーム",
  "field": "技術デモゲーム",
  "publicTarget": "GitHub Pages / GitHub Release",
  "platformScope": "static Web technical demo / GitHub Pages",
  "overview": "センサー入力とLAN同期を模擬し、クロス環境の遅延や欠落を遊びとして確認するブラウザ技術デモ。",
  "problem": "複数環境連携は実機やネットワーク差に左右され、遊びとして成立する前に検証が散らばりやすい。",
  "differentiation": "センサー packet と peer 状態を代表データ化し、ブラウザ単体で同期リスクを再現する。",
  "audience": "技術デモ制作者、LANイベント運営者、クロス環境入力の検証者",
  "requiredInputs": [
    "sensorPacket",
    "peerState",
    "latencyClass",
    "playMode"
  ],
  "modules": [
    "game-loop",
    "network-simulator",
    "web-game",
    "scenario-validator"
  ],
  "accent": "#0891b2",
  "secondary": "#164e63",
  "scenarioNouns": [
    "センサーpacket",
    "LAN同期",
    "デモステージ"
  ]
};

export function evaluateScenario(scenario) {
  if (scenario.type === 'mixed-batch') {
    const results = (scenario.items || []).map((inputs, index) => evaluateScenario({ id: scenario.id + '-' + index, inputs, flags: index === 2 ? ['needsReview'] : [] }));
    const accepted = results.filter((result) => result.status !== 'error').length;
    const warnings = results.filter((result) => result.status !== 'pass').length;
    return { id: scenario.id, status: warnings ? 'warning' : 'pass', accepted, warnings, missing: results.flatMap((result) => result.missing), score: warnings ? 78 : 96 };
  }
  const inputs = scenario.inputs || {};
  const missing = product.requiredInputs.filter((key) => inputs[key] === undefined || inputs[key] === null || inputs[key] === '');
  if (missing.length) return { id: scenario.id, status: 'error', accepted: 0, warnings: 0, missing, score: 0 };
  const risky = Object.values(inputs).some((value) => /stale|low|noisy|manual-lock|large-water-change|late-brake|unknown|overflow|rush|storm|fatigue|unstable|crowded|high/i.test(String(value)));
  const warnings = (scenario.flags || []).includes('needsReview') || risky ? 1 : 0;
  return { id: scenario.id, status: warnings ? 'warning' : 'pass', accepted: 1, warnings, missing: [], score: warnings ? 86 : 96 };
}

export function summarizeProduct() {
  return { name: product.ideaName, repo: product.repo, domain: product.domain, releaseTarget: product.publicTarget, platformScope: product.platformScope, responsibilities: product.modules, requiredInputs: product.requiredInputs };
}
