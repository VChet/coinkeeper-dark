<p align="center">
  <img alt="logo" src="./meta/logo.png" width="580">
  <br>
  <a href="https://github.com/VChet/coinkeeper-dark/tags">
    <img src="https://img.shields.io/github/tag/VChet/coinkeeper-dark?label=version&style=flat-square" alt="Version">
  </a>
  <a href="https://github.com/VChet/coinkeeper-dark/actions/workflows/build.yaml">
    <img src="https://img.shields.io/github/actions/workflow/status/VChet/coinkeeper-dark/.github/workflows/build.yaml?style=flat-square" alt="lint">
  </a>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs welcome">
  <a href="https://github.com/VChet/coinkeeper-dark/raw/master/src/coinkeeper-dark.user.css">
    <img src="https://img.shields.io/badge/Install%20with-Stylus-00adad?style=flat-square" alt="Install directly with Stylus">
  </a>
</p>

## Preview

![Preview](./meta/preview.png)

## Installation

1. Install Stylus/Cascadea (Safari)
   - [![Chrome][chrome-img] Chrome][chrome-href]
   - [![Firefox][firefox-img] Firefox][firefox-href]
   - [![Safari][safari-img] Safari][safari-href]
1. [Install UserCSS][install-href]

## Contribute

Anyone and everyone is welcome to [contribute](https://github.com/VChet/coinkeeper-dark/pulls) and report any [issues](https://github.com/VChet/coinkeeper-dark/issues).

## Development

1. [Fork](https://github.com/VChet/coinkeeper-dark/fork) and download this repository
1. Install [Node.js](https://nodejs.org/)
1. Install [pnpm](https://pnpm.io/) `npm install pnpm --global`
1. Install all dependencies using `pnpm install`
1. Change [mappings](./src/mappings.js)
1. Generate style with `npm run build`
1. Make additional changes in [main style](./src/coinkeeper-dark.user.css) if needed
1. Commit and push your changes
1. Make a pull request

<!-- Links -->
[chrome-img]: https://github.com/alrra/browser-logos/raw/master/src/chrome/chrome_16x16.png
[chrome-href]: https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne
[firefox-img]: https://github.com/alrra/browser-logos/raw/master/src/firefox/firefox_16x16.png
[firefox-href]: https://addons.mozilla.org/en-US/firefox/addon/styl-us/
[safari-img]: https://github.com/alrra/browser-logos/raw/master/src/safari/safari_16x16.png
[safari-href]: https://cascadea.app/
[install-href]: https://github.com/VChet/coinkeeper-dark/raw/master/src/coinkeeper-dark.user.css
