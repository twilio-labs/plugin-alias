const AliasBaseCommand = require('../../utilities/AliasBaseCommand')
const FileUtil = require('../../utilities/FileUtility.js')
const FilesystemStorage = require('../../utilities/FileSnapshot/FilesystemStorage')

class List extends AliasBaseCommand {
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

    const aliasFilePath = new FileUtil(this).getAliasFilePath()
    if (new FileUtil(this).pathExists(aliasFilePath)) {
      const db = await List.storage.load(aliasFilePath)
      let output = 'Alias\tCommand'

      for (const alias in db) {
        output += `\n${alias}\t${db[alias]}`
      }

      console.log(output)
    } else {
      new FileUtil(this).setupIncompleteWarning()
    }
  }
}

List.description = 'View the aliases'
List.id = 'alias:list'
List.storage = new FilesystemStorage()

module.exports = List
