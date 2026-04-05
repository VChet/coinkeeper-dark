import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFile, writeFile, readdir } from "node:fs/promises";
import process from "node:process";
import fetchCss from "fetch-css";
import remapCss from "remap-css";
import stylelint from "stylelint";
import MAPPINGS from "./mappings.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SOURCES = [{ url: "https://coinkeeper.me/introduce-yourself" }];
const SOURCE_FILE = join(__dirname, "coinkeeper-dark.user.css");
const ICONS_DIR = join(__dirname, "icons");

const REMAP_OPTIONS = {
  ignoreSelectors: [/\spre$/, /^table$/],
  indentCss: 2,
  stylistic: true,
  validate: true
};
const PREFIX = "  /* begin remap-css rules */";
const SUFFIX = "  /* end remap-css rules */";
const REMAP_REGEX = /.*begin remap-css[\s\S]+end remap-css.*/;
const ICONS_PREFIX = "  /* begin icon-css rules */";
const ICONS_SUFFIX = "  /* end icon-css rules */";
const ICONS_REMAP_REGEX = /.*begin icon-css[\s\S]+end icon-css.*/;

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
  let generatedCss = await remapCss(await fetchCss(SOURCES), MAPPINGS, REMAP_OPTIONS);
  generatedCss = `${PREFIX}\n${generatedCss}\n${SUFFIX}`;

  let iconsCss = await generateIconStyles();
  iconsCss = `${ICONS_PREFIX}\n${iconsCss}\n${ICONS_SUFFIX}`;

  let sourceCss = await readFile(SOURCE_FILE, "utf8");
  sourceCss = sourceCss.replace(REMAP_REGEX, generatedCss).replace(ICONS_REMAP_REGEX, iconsCss);
  const { code } = await stylelint.lint({ code: sourceCss, fix: true });
  return writeFile(SOURCE_FILE, code);
}

main().then(exit).catch(exit);
