const { join } = require("node:path");
const { readdir, readFile, writeFile } = require("node:fs/promises");
const { execSync } = require("node:child_process");

const src = join(__dirname, "..", "src");

async function updateFiles() {
  try {
    const files = await readdir(src);
    const cssFiles = files.filter(file => file.endsWith(".css"));
    for (const filename of cssFiles) {
      const filepath = join(src, filename);
      const contents = await readFile(filepath, "utf8");
      const updatedContents = contents.replace(/\b\d+\.\d+\.\d+\b/g, process.env.npm_package_version);
      await writeFile(filepath, updatedContents, "utf8");
    }

    const filesString = cssFiles.map(file => join(src, file)).join(" ");
    execSync(`git add ${filesString}`).toString();
  } catch (error) {
    console.error("Error:", error);
  }
}

updateFiles();
