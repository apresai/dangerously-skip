import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  // `eslint .` walks the whole tree, but eslint-config-next only ignores
  // .next/, out/, build/. Exclude OpenNext output and the cdk/ sub-project
  // (its own toolchain) so `npm run lint` stays clean after a local build.
  {
    ignores: [".open-next/**", "cdk/**"],
  },
];

export default eslintConfig;
