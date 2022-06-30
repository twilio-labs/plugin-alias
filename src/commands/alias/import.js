const AliasBaseCommand = require('../../utilities/AliasBaseCommand')
const FileUtil = require('../../utilities/FileUtility.js')
const FilesystemStorage = require('../../utilities/FileSnapshot/FilesystemStorage')

class Import extends AliasBaseCommand {
  async run () {
    await super.run()

    const { args } = this.parse(Import)

    if (this.validateArguments(args)) {
      const aliasFilePath = new FileUtil(this).getAliasFilePath()

      if (new FileUtil(this).pathExists(aliasFilePath)) {
        const destFile = args.dest
        const ans = new FileUtil(this).copyFileToDestination(destFile, aliasFilePath, 'import')

        if (ans) { console.log(`Successfully exported aliases to the file ${destFile}`) }
      } else {
        new FileUtil(this).setupIncompleteWarning()
      }
    }
  }

  validateArguments (args) {
    let isValid = true
    let userPath = ''

    try {
      userPath = args.dest
    } catch (err) {
      console.log(err)
    }

    if (userPath === undefined) {
      console.log('please add the path of the alias.json file')
      return false
    }

    const success = new FileUtil(this).importPathExists(userPath)

    if (!(success)) {
      console.log('alias file does not exist at the specified path')
      isValid = false
    }

    return isValid
  }
}

Import.id = 'alias:import'

Import.args = [
  {
    name: 'dest',
    description: 'path of alias file'
  }
]

Import.description = 'Import aliases from a file'
Import.storage = new FilesystemStorage()
module.exports = Import
