const fs = require("fs");
const path = require("path");

function printTree(dir, prefix = "") {
  let files = fs.readdirSync(dir);

  // 🔥 احذف node_modules من البداية
  files = files.filter(file => file !== "node_modules");

  files.forEach((file, index) => {
    const fullPath = path.join(dir, file);
    const isLast = index === files.length - 1;
    const connector = isLast ? "└── " : "├── ";

    console.log(prefix + connector + file);

    if (fs.statSync(fullPath).isDirectory()) {
      printTree(fullPath, prefix + (isLast ? "    " : "│   "));
    }
  });
}

printTree(".");