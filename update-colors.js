const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Blue -> Sky (Medical Blue)
  content = content.replace(/bg-blue-600/g, 'bg-sky-700');
  content = content.replace(/hover:bg-blue-700/g, 'hover:bg-sky-800');
  content = content.replace(/text-blue-600/g, 'text-sky-700');
  content = content.replace(/hover:text-blue-600/g, 'hover:text-sky-700');
  content = content.replace(/border-blue-600/g, 'border-sky-700');
  content = content.replace(/border-blue-500/g, 'border-sky-600');
  content = content.replace(/focus:border-blue-500/g, 'focus:border-sky-600');
  content = content.replace(/focus:ring-blue-500/g, 'focus:ring-sky-600');
  content = content.replace(/bg-blue-50/g, 'bg-sky-50');
  content = content.replace(/hover:bg-blue-50/g, 'hover:bg-sky-50');
  content = content.replace(/bg-blue-100/g, 'bg-sky-100');
  content = content.replace(/text-blue-700/g, 'text-sky-800');
  content = content.replace(/border-blue-200/g, 'border-sky-200');
  content = content.replace(/bg-blue-900/g, 'bg-sky-900');
  content = content.replace(/from-blue-600/g, 'from-sky-700');
  content = content.replace(/to-blue-900/g, 'to-sky-900');
  content = content.replace(/border-blue-800/g, 'border-sky-800');
  content = content.replace(/text-blue-900/g, 'text-sky-900');
  content = content.replace(/text-blue-100/g, 'text-sky-100');
  
  // Emerald -> Teal (Medical Green)
  content = content.replace(/emerald/g, 'teal');
  
  // Purple -> Indigo
  content = content.replace(/purple/g, 'indigo');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log('Updated classes in:', filePath);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.html') || file.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

const srcDir = path.join(__dirname, 'src', 'app');
processDirectory(srcDir);
console.log('Class replacement complete.');
