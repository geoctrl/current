// plugins/vite-plugin-icon-sprite.js

import { promises as fs } from "fs";
import path from "path";

export default function vitePluginIconSprite(
  options: { directory?: string } = {},
) {
  return {
    name: "vite-plugin-icoset",
    async transformIndexHtml(html: any) {
      const iconsRaw: string[] = [];
      const { directory } = options;

      async function dirIcons(dir?: string): Promise<void> {
        if (dir) {
          const icons = await fs.readdir(dir, { withFileTypes: true });
          const promises = icons.map(async (file) => {
            const filePath = path.join(dir, file.name);
            if (file.isFile() && path.extname(file.name) === ".svg") {
              const file = await fs.readFile(filePath, { encoding: "utf8" });
              const name = path.parse(filePath).name;
              const rawData = file
                .replace(/svg/g, "symbol")
                .replace(/symbol/, `symbol id="${name}"`);
              iconsRaw.push(rawData);
            }
          });
          await Promise.all(promises);
        }
      }

      if (directory) {
        await dirIcons(directory);
      }

      const codeToInject = iconsRaw.join("\n");
      return html.replace(
        /<body>/,
        `<body>\n<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${codeToInject}</svg>`,
      );
    },
  };
}
