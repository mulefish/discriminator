const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
const publicDir = path.join(__dirname, 'public');


function makeIndexPage() {
  fs.readdir(publicDir, (err, files) => {
    if (err) {
      console.error('Error reading public directory:', err);
      return res.status(500).send('Server Error');
    }

    const htmlFiles = files.filter(file => file.endsWith('.html'));

    let tableContent = '<table border="1"></tr>';
    htmlFiles.forEach((file, i) => {
      tableContent += `<tr><td>${i}</td><td><a href="/${file}">${file}</a></td></tr>`;
    });
    tableContent += '</table>';

    const indexPath = path.join(publicDir, 'index.html')
    fs.readFile(indexPath, 'utf8', (err, data) => {
      if (err) {
        console.error('OH NO! reading index.html:', err);

      }
      let templatingString = /<!-- START_REPLACE_ME -->(.|\s)*?<!-- END_REPLACE_ME -->/;
      if (templatingString.test(data)) {
        const updatedHtml = data.replace(
          templatingString,
          `<!-- START_REPLACE_ME -->${tableContent}<!-- END_REPLACE_ME -->`
        );

        fs.writeFile(indexPath, updatedHtml, 'utf8', (err) => {
          if (err) {
            console.error('Error writing to index.html:', err);
          }
        });
      } else {
        console.error('Ack!: NO TEMPLATING STRING FOUND IN index.html');
      }
    });
  });
}

app.listen(port, () => {
  makeIndexPage()
  console.log(`Server running at http://localhost:${port}`);
});
