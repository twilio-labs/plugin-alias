const AliasBaseCommand = require('../../utilities/AliasBaseCommand')
const FileUtil = require('../../utilities/FileUtility.js')
const FilesystemStorage = require('../../utilities/FileSnapshot/FilesystemStorage')

class Export extends AliasBaseCommand {
  async run () {
    await super.run()

    if (this.argv.length > 0) {
      let args = ''
      for (const arg in this.argv) {
        args += "'" + this.argv[arg] + "' "
      }
      console.log(`Invalid argument ${args}provided`)
      return
    }

    const filename = 'dataexport.json'
    const aliasFilePath = new FileUtil(this).getAliasFilePath()
    const destFilePath = process.cwd() + '/' + filename

    if (new FileUtil(this).pathExists(aliasFilePath)) {
      const ans = new FileUtil(this).copyFileToDestination(aliasFilePath, destFilePath, 'export')
      if (ans) { console.log(`Successfully exported aliases to the file ${filename}`) }
    } else {
      new FileUtil(this).setupIncompleteWarning()
    }
  }
}

Export.id = 'alias:export'
Export.description = 'Export the aliases'
Export.storage = new FilesystemStorage()
module.exports = Export
