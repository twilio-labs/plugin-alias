const fs = require('fs').promises


class FilesystemStorage {
  constructor(initialData = {}) {
    this.data = initialData;

  }

  async load(aliasFilePath) {
    try {
      const file = await fs.readFile(aliasFilePath);
      return JSON.parse(file.toString('utf-8'));
    } catch {
      return await Promise.resolve(this.data);
    }
  }

  save(data, aliasFilePath) {
    return fs.writeFile(aliasFilePath, JSON.stringify(data))
  }
}

module.exports = FilesystemStorage
