const child_process = require('child_process');
const fs = require('fs');

child_process.exec("NODE_ENV=production yarn licenses generate-disclaimer", (err, stdout) => {
  if (err) {
    throw err;
  }
  const lines = stdout.split('\n');
  const paragraphs = lines.map(line => line.replace("<", "&lt;").replace(">", "&gt;")).map(line => `<p>${line || "&nbsp;"}</p>`);
  const fileData = `// This is file is generated. DO NOT EDIT.
const License = () => (
  <div className="text-left max-w-xl h-96 overflow-auto">
  ${paragraphs.join('\n')}
  </div>
);

export default License;
  `

  fs.writeFileSync('./src/views/license.tsx', fileData);
});
