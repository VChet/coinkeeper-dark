# Coinkeeper Dark

[![version][tags-img]][tags-url]
[![status][workflow-img]][workflow-url]
![prs-welcome][prs-welcome-img]
[![install][install-img]][install-url]

## Preview

![Preview](./meta/preview.png)

## Installation

1. Install Stylus/Cascadea (Safari)
   - [![Chrome][chrome-img] Chrome][chrome-url]
   - [![Firefox][firefox-img] Firefox][firefox-url]
   - [![Safari][safari-img] Safari][safari-url]
1. [Install UserCSS][install-url]

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

<!-- Badges -->
[tags-img]: https://img.shields.io/github/tag/VChet/coinkeeper-dark?label=version&style=flat-square
[tags-url]: https://github.com/VChet/coinkeeper-dark/tags
[workflow-img]: https://img.shields.io/github/actions/workflow/status/VChet/coinkeeper-dark/.github/workflows/build.yaml?style=flat-square
[workflow-url]: https://github.com/VChet/coinkeeper-dark/actions/workflows/build.yaml
[prs-welcome-img]: https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square
[install-img]: https://img.shields.io/badge/Install%20with-Stylus-00adad?style=flat-square
[install-url]: https://github.com/VChet/coinkeeper-dark/raw/master/src/coinkeeper-dark.user.css
<!-- Links -->
[chrome-img]: https://github.com/alrra/browser-logos/raw/master/src/chrome/chrome_16x16.png
[chrome-url]: https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne
[firefox-img]: https://github.com/alrra/browser-logos/raw/master/src/firefox/firefox_16x16.png
[firefox-url]: https://addons.mozilla.org/en-US/firefox/addon/styl-us/
[safari-img]: https://github.com/alrra/browser-logos/raw/master/src/safari/safari_16x16.png
[safari-url]: https://cascadea.app/
