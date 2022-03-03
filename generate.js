#!/usr/bin/env node
"use strict";

const fetchCss = require("fetch-css");
const remapCss = require("remap-css");
const { lint } = require("stylelint");
const { join } = require("path");
const { readFile, writeFile } = require("fs/promises");

const mappings = {
  // Background
  "$background: #fff": "var(--gray-dark)",
  "$background: #fbfbf9": "var(--gray-dark)",
  "$background: #e4e4e4": "var(--gray-dark)",

  "$background: rgba(244,244,241,.4)": "var(--gray)",
  "$background: #989898": "var(--gray)",
  "$background: #f0f0f0": "var(--gray)",

  "$background: #dedcdc": "var(--gray-light)",
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
  "$border: #f3f2f2": "var(--gray)",
  "$border: rgba(222,220,220,.8)": "var(--gray)",
  "$border: #f3f2f2;": "var(--gray)",

  "$border: #404040": "var(--gray-light)",
  "$border: #dedcdc": "var(--gray-light)",
  // Box-shadow
  "box-shadow: 2px 2px 9px rgba(0, 0, 0, .13)": "box-shadow: none",
};

const sources = [{ url: "https://coinkeeper.me/introduce-yourself" }];
const ignoreSelectors = [/\spre$/, /^table$/];
const sourceFile = join(__dirname, "coinkeeper-dark.user.css");

const remapOptions = {
  ignoreSelectors,
  indentCss: 2,
  stylistic: true,
  validate: true,
};

const exit = (err) => {
  if (err) console.error(err);
  process.exit(err ? 1 : 0);
};

async function main() {
  let generatedCss = await remapCss(await fetchCss(sources), mappings, remapOptions);

  const prefix = `  /* begin remap-css rules */`;
  const suffix = `  /* end remap-css rules */`;
  generatedCss = `${prefix}\n${generatedCss}\n${suffix}`;

  const re = new RegExp(/.*begin remap-css[\s\S]+end remap-css.*/, "gm");
  let sourceCss = await readFile(sourceFile, "utf8");
  sourceCss = sourceCss.replace(re, generatedCss);
  const { output } = await lint({ code: sourceCss, fix: true });
  return writeFile(sourceFile, output);
}

main().then(exit).catch(exit);
