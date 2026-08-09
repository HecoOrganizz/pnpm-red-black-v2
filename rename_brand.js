import fs from 'fs';
import path from 'path';

const dirsToProcess = ['src', 'public'];
const additionalFiles = ['package.json', 'README.md'];

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

function replaceInFile(filePath) {
  if (filePath.endsWith('.png') || filePath.endsWith('.ico') || filePath.endsWith('.woff2')) return; // skip binary
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let newContent = content
    .replace(/Zimidi/g, 'Zidimi')
    .replace(/zimidi/g, 'zidimi')
    .replace(/ZIMIDI/g, 'ZIDIMI');
    
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Updated: ${filePath}`);
  }
}

// Process directories
dirsToProcess.forEach(dir => walkDir(dir, replaceInFile));

// Process root files
additionalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    replaceInFile(file);
  }
});
