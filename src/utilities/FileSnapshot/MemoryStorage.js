const fs = require('fs')

class MemoryStorage {
  constructor (initialData = {}, aliasPathVar = true, importPathVar = true) {
    this.data = initialData
    this.aliasPathVar = aliasPathVar
    this.importPathVar = importPathVar
  }

  async load () {
    return Promise.resolve(this.data)
  }

  save (data, _aliasFilePath) {
    this.data = data
    return Promise.resolve()
  }

  path (_config) {
    return ''
  }

  pathExists (_path) {
    return this.aliasPathVar
  }

  importPathExists (_path) {
    return this.importPathVar
  }

  makeDirectory (_folderPath) {
    return Promise.resolve()
  }

  copyFile (sourcePath, destPath, mode) {
    if (mode === 'export') {
      return fs.promises.writeFile(destPath, JSON.stringify(this.data))
    } else {
      const data = JSON.parse(fs.readFileSync(sourcePath).toString())
      this.save(data, destPath)
    }
  }

  removeDirectory (_dir) {
    return Promise.resolve()
  }
}

module.exports = MemoryStorage
