const fs = require('fs/promises')
const FileUtil = require('../FileUtility');

class FilesystemStorage {
  constructor(initialData = {}) {
    this.data = initialData;
    
  }

  load(aliasFilePath) {
      return fs.readFile(aliasFilePath).then(file => {
        return JSON.parse(file.toString('utf-8'))
    }).catch(() => {
      // If reading the file results in an error then assume that the file didn't exist and return an empty object
      return Promise.resolve(this.data)
    })
  }

  save(data, aliasFilePath) {
    return fs.writeFile(aliasFilePath, JSON.stringify(data))
  }
}

module.exports = FilesystemStorage
