import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextVitals,
  { ignores: [".next/**", "node_modules/**", "Prototype Files/**", "next-env.d.ts"] },
];

export default config;
