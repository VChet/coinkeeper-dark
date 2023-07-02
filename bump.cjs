const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');

function main () {
  const files = readdirSync(__dirname).filter(filename => filename.endsWith('.user.css'));
  files.forEach(filename => {
    const path = `${__dirname}/${filename}`;
    const contents = readFileSync(path, 'utf8');
    const updatedContents = contents.replace(/\b\d+\.\d+\.\d+\b/g, process.env.npm_package_version);
    writeFileSync(path, updatedContents, 'utf8');
  });

  execSync(`git add ${files.join(' ')}`).toString();
}

main()
