const fs = require('fs');
const { execSync } = require('child_process');

function main () {
  const files = fs.readdirSync(__dirname).filter(filename => filename.endsWith('.user.css'));
  files.forEach(filename => {
    const path = `${__dirname}/${filename}`;
    const contents = fs.readFileSync(path, 'utf8');
    const updatedContents = contents.replace(/\b\d+\.\d+\.\d+\b/g, process.env.npm_package_version);
    fs.writeFileSync(path, updatedContents, 'utf8');
  });

  execSync(`git add ${files.join(' ')}`).toString();
}

main()
