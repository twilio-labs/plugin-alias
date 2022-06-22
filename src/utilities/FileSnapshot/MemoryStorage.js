const fs = require('fs')

class MemoryStorage {
  constructor(initialData = {}, aliasPathVar = true, importPathVar = true) {
    this.data = initialData;
    this.aliasPathVar = aliasPathVar;
    this.importPathVar = importPathVar;
  }

  async load() {
    return Promise.resolve(this.data);
  }

  save(data, aliasFilePath) {
    this.data = data
    return Promise.resolve()
  }

  path(config) {
    return "";
  }

  pathExists(path) {
    return this.aliasPathVar;
  }

  importPathExists(path) {
    return this.importPathVar;
  }

  makeDirectory(folderPath) {
    return Promise.resolve();
  }

  copyFile(sourcePath, destPath, mode) {
    if(mode === "export")
      {
        return fs.promises.writeFile(destPath, JSON.stringify(this.data))
      }
    else
    {
      var data = JSON.parse(fs.readFileSync(sourcePath).toString());
      this.save(data, destPath);
    }
  }

  removeDirectory(dir) {
    return Promise.resolve();
  }
}

module.exports = MemoryStorage
