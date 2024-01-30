const path = require("path");
const { readdirSync, readFileSync, writeFileSync } = require("fs");
const { execSync } = require("child_process");

const files = readdirSync(__dirname).filter(filename => filename.endsWith(".user.css"));
for (const filename of files) {
  const filepath = path.join(__dirname, filename);
  const contents = readFileSync(filepath, "utf8");
  const updatedContents = contents.replace(/\b\d+\.\d+\.\d+\b/g, process.env.npm_package_version);
  writeFileSync(filepath, updatedContents, "utf8");
}

execSync(`git add ${files.join(" ")}`).toString();
