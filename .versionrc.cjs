module.exports = {
  tagPrefix: "",
  bumpFiles: [
    "package.json",
    { filename: "src/coinkeeper-dark.user.css", updater: "src/meta-updater.js" },
    { filename: "src/dev-coinkeeper.user.css", updater: "src/meta-updater.js" }
  ],
  scripts: {
    prerelease: "npm run lint:all"
  },
  writerOpts: {
    finalizeContext(context) {
      if (!context.commitGroups?.length) {
        context.commitGroups = [{ commits: [{ header: "No significant changes" }] }];
      }
      return context;
    }
  }
};
