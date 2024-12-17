import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import prettier from "prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let outputTypes = `// auto-generated icon type definitions from /icons-build.js
export const iconsGen = [`;
let outputGlobalSvg = `// auto-generated svg component from /icons-build.js
export const GlobalSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
    __SYMBOLS__
  </svg>
)`;
const icons = [];

(async () => {
  async function dirIcons(dir) {
    const iconFiles = await fs.readdir(dir, { withFileTypes: true });
    const promises = iconFiles.map(async (file) => {
      const filePath = path.join(dir, file.name);
      if (file.isFile() && path.extname(file.name) === ".svg") {
        icons.push({
          name: path.basename(filePath, ".svg"),
          raw: await fs.readFile(filePath, { encoding: "utf8" }),
        });
      }
    });

    await Promise.all(promises);
  }

  await dirIcons(path.resolve(__dirname, "icons"));
  outputTypes += `${icons.map(({ name }) => `"${name}"`).join(",")}] as const;

export type IconGen = (typeof iconsGen)[number];
`;

  outputGlobalSvg = outputGlobalSvg.replace(
    "__SYMBOLS__",
    icons
      .map(({ name, raw }) => {
        return raw
          .replace(/<svg/g, "<symbol")
          .replace(/<\/svg/g, "</symbol")
          .replace(/<symbol/, `<symbol id="${name}"`);
      })
      .join("\n"),
  );

  outputTypes = await prettier.format(outputTypes, { parser: "typescript" });
  await fs.writeFile(
    path.resolve(__dirname, "app/types/icon-gen.ts"),
    outputTypes,
  );

  outputGlobalSvg = await prettier.format(outputGlobalSvg, {
    parser: "typescript",
  });
  await fs.writeFile(
    path.resolve(__dirname, "app/components/global-svg.tsx"),
    outputGlobalSvg,
  );
})();
