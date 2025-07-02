import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFile, writeFile, readdir } from "node:fs/promises";
import fetchCss from "fetch-css";
import remapCss from "remap-css";
import stylelint from "stylelint";

import mappings from "./mappings.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const sources = [{ url: "https://coinkeeper.me/introduce-yourself" }];
const ignoreSelectors = [/\spre$/, /^table$/];
const SOURCE_FILE = join(__dirname, "coinkeeper-dark.user.css");
const ICONS_DIR = join(__dirname, "icons");

const remapOptions = {
  ignoreSelectors,
  indentCss: 2,
  stylistic: true,
  validate: true
};

function exit(error) {
  if (error) console.error(error);
  process.exit(error ? 1 : 0);
}

async function generateIconStyles() {
  const filenameReg = /(?<=ic_ms_).*(?=\.webp)/;
  let styles = "";
  const files = await readdir(ICONS_DIR);
  for (const filename of files) {
    const name = filename.match(filenameReg);
    const buffer = await readFile(join(ICONS_DIR, filename));
    const selector = [`.ck-category__icon_${name}, .ck-card-item_icon--${name} {`];
    selector.push(`  background-image: url("data:image/webp;base64,${buffer.toString("base64")}");`);
    selector.push("}");
    styles += selector.join("\n");
  }
  return styles;
}

async function main() {
  let generatedCss = await remapCss(await fetchCss(sources), mappings, remapOptions);
  const prefix = "  /* begin remap-css rules */";
  const suffix = "  /* end remap-css rules */";
  generatedCss = `${prefix}\n${generatedCss}\n${suffix}`;

  let iconsCss = await generateIconStyles();
  const iconsPrefix = "  /* begin icon-css rules */";
  const iconsSuffix = "  /* end icon-css rules */";
  iconsCss = `${iconsPrefix}\n${iconsCss}\n${iconsSuffix}`;

  const remapReg = /.*begin remap-css[\s\S]+end remap-css.*/;
  const iconsReg = /.*begin icon-css[\s\S]+end icon-css.*/;
  let sourceCss = await readFile(SOURCE_FILE, "utf8");
  sourceCss = sourceCss.replace(remapReg, generatedCss).replace(iconsReg, iconsCss);
  const { code } = await stylelint.lint({ code: sourceCss, fix: true });
  return writeFile(SOURCE_FILE, code);
}

main().then(exit).catch(exit);
