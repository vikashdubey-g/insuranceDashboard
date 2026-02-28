const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const srcDir = path.join(rootDir, "src");

function walk(dir, callback) {
  let files = fs.readdirSync(dir);
  files.forEach((f) => {
    let dirPath = path.join(dir, f);
    if (f === "__test__" || f === "__tests__") return;
    if (!fs.existsSync(dirPath)) return;
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

const testFiles = [];
walk(srcDir, function (filePath) {
  if (filePath.endsWith(".test.ts") || filePath.endsWith(".test.tsx")) {
    testFiles.push(filePath);
  }
});

testFiles.forEach((file) => {
  const dir = path.dirname(file);
  if (path.basename(dir) === "__test__") return;

  const fileName = path.basename(file);
  const newDir = path.join(dir, "__test__");
  const newPath = path.join(newDir, fileName);

  if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir, { recursive: true });
  }

  let content = fs.readFileSync(file, "utf-8");

  // adjust relative imports
  content = content.replace(
    /(import\s+.*?from\s+['"])([^'"]+)(['"])/g,
    (match, p1, importPath, p3) => {
      if (importPath.startsWith(".")) {
        const absImport = path.resolve(dir, importPath);
        let newImport = path.relative(newDir, absImport);
        newImport = newImport.replace(/\\/g, "/");
        if (!newImport.startsWith(".")) {
          newImport = "./" + newImport;
        }
        return `${p1}${newImport}${p3}`;
      }
      return match;
    },
  );

  content = content.replace(
    /(jest\.mock\(['"])([^'"]+)(['"])/g,
    (match, p1, mockPath, p3) => {
      if (mockPath.startsWith(".")) {
        const absMock = path.resolve(dir, mockPath);
        let newMock = path.relative(newDir, absMock);
        newMock = newMock.replace(/\\/g, "/");
        if (!newMock.startsWith(".")) {
          newMock = "./" + newMock;
        }
        return `${p1}${newMock}${p3}`;
      }
      return match;
    },
  );

  fs.writeFileSync(newPath, content);
  fs.unlinkSync(file);
  console.log(`Moved ${fileName} to ${path.relative(rootDir, newPath)}`);
});
