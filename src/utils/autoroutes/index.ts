import { watch, promises as fs } from "fs";
import { spawn } from "node:child_process";

import decoder from "./decoder";

const autoRoutes = async (pageFolderPath: string = "") => {
  const folderPath = `./src/pages/${pageFolderPath}`;
  const folder = await fs.readdir(folderPath, {
    withFileTypes: true,
  });
  for (const file of folder) {
    if (file.isDirectory()) {
      autoRoutes(`${pageFolderPath}/${file.name}`);
      await fs.mkdir(`./src/.routes/${pageFolderPath}/${file.name}`, {
        recursive: true,
      });
    }
    if (!file.isFile()) {
      continue;
    }
    if (file.name.includes("route.ts")) {
      const fileDecode = await decoder(`../../.${folderPath}/${file.name}`);
      await fs.writeFile(
        `./src/.routes/${pageFolderPath}/index.tsx`,
        fileDecode,
        "utf8",
      );
    } else {
      const fileRead = await fs.readFile(`${folderPath}/${file.name}`, "utf8");
      await fs.writeFile(
        `./src/.routes/${pageFolderPath}/${file.name}`,
        fileRead,
        "utf8",
      );
    }
  }
};

const cmd = (command: string, options?: string[] | undefined) => {
  const p = spawn(command, options);
  return new Promise(resolve => {
    p.stdout.on("data", x => {
      process.stdout.write(x.toString());
    });
    p.stderr.on("data", x => {
      process.stderr.write(x.toString());
    });
    p.on("exit", code => {
      resolve(code);
    });
  });
};

const main = async () => {
  await autoRoutes("");
  await cmd("bunx", ["prettier", "--write", "./src/routes"]);
  await cmd("rm", ["-rf", "./src/routes"]);
  await cmd("mv", ["./src/.routes", "./src/routes"]);
};

main();
const watcher = watch("./src/pages", { recursive: true }, main);
process.on("SIGINT", () => {
  console.log("Closing watcher...");
  watcher.close();
  process.exit(0);
});
