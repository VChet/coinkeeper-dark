#!/usr/bin/env node
"use strict";

import fetchCss from "fetch-css";
import remapCss from "remap-css";
import stylelint from "stylelint";
import url from "url";
import { join } from "path";
import { readFile, writeFile, readdir } from "fs/promises";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const mappings = {
  // Background
  "$background: #e4e4e4": "var(--gray-dark)",
  "$background: #f3f2f2": "var(--gray-dark)",
  "$background: #fbfbf9": "var(--gray-dark)",
  "$background: #fff": "var(--gray-dark)",

  "$background: #989898": "var(--gray)",
  "$background: #f0f0f0": "var(--gray)",
  "$background: rgba(244,244,241,.4)": "var(--gray)",

  "$background: #dedcdc": "var(--gray-light)",
  "$background: #e4e3e3": "var(--gray-light)",
  "$background: rgba(255,255,255,.5)": "var(--gray-light)",

  "$background: #434343": "var(--light)",
  // Color
  "color: #333": "color: var(--text)",
  "color: #5f6160": "color: var(--text)",
  "color: #64635f": "color: var(--text)",
  "color: #646c69": "color: var(--text)",
  "color: #696868": "color: var(--text)",
  "color: #757474": "color: var(--text)",
  "color: #757575": "color: var(--text)",
  "color: #797878": "color: var(--text)",
  "color: #7b7a7a": "color: var(--text)",
  "color: rgba(0,0,0,.7)": "color: var(--text)",

  "color: #000": "color: var(--light)",
  "color: #404040": "color: var(--light)",
  "color: #4f4f4f": "color: var(--light)",
  "color: #576563": "color: var(--light)",
  "color: #585858": "color: var(--light)",
  "color: #959595": "color: var(--light)",
  "color: rgba(117,117,117,.75)": "color: var(--light)",
  // Borders
  "$border: #e8e7e7": "var(--gray)",
  "$border: #f3f2f2;": "var(--gray)",
  "$border: #f3f2f2": "var(--gray)",
  "$border: rgba(222,220,220,.8)": "var(--gray)",

  "$border: #404040": "var(--gray-light)",
  "$border: #dedcdc": "var(--gray-light)",
  // Box-shadow
  "box-shadow: 2px 2px 9px rgba(0, 0, 0, .13)": "box-shadow: none"
};

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
};

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
  const { output } = await stylelint.lint({ code: sourceCss, fix: true });
  return writeFile(SOURCE_FILE, output);
}

main().then(exit).catch(exit);
