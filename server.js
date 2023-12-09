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

    let tableContent = '<table><tr><th>HTML Files</th></tr>';
    htmlFiles.forEach(file => {
      tableContent += `<tr><td><a href="/${file}">${file}</a></td></tr>`;
    });
    tableContent += '</table>';

    const indexPath = path.join(publicDir, 'index.html')
    fs.readFile(indexPath, 'utf8', (err, data) => {
      if (err) {
        console.error('OH NO! reading index.html:', err);

      }

      const updatedHtml = data.replace(
        /<!-- START_REPLACE_ME -->(.|\s)*?<!-- END_REPLACE_ME -->/,
        `<!-- START_REPLACE_ME -->${tableContent}<!-- END_REPLACE_ME -->`
      );
      // Check if replacement was successful
      if (updatedHtml === data) {
        console.error('Ack!: Replacement markers not found in index.html');
      }
      fs.writeFile(indexPath, updatedHtml, 'utf8', (err) => {
        if (err) {
          console.error('Error writing to index.html:', err);
        }
      });
    });
  });
}

app.listen(port, () => {
  makeIndexPage()
  console.log(`Server running at http://localhost:${port}`);
});
