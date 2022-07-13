const AliasBaseCommand = require('../../utilities/AliasBaseCommand')
const FileUtil = require('../../utilities/FileUtility.js')
const FilesystemStorage = require('../../utilities/FileSnapshot/FilesystemStorage')

class Export extends AliasBaseCommand {
  async run () {
    await super.run()

    const { args } = await this.parse(Export)

    if (this.validateArguments(args)) {
      const filename = args.dest ? args.dest : 'dataexport.json'
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

  validateArguments (args) {
    const isValid = true
    let userPath = ''

    try {
      userPath = args.dest
    } catch (err) {
      console.log(err)
    }

    if (userPath === undefined) {
      console.log('Exporting to default path ...')
    }

    return isValid
  }
}

Export.id = 'alias:export'
Export.args = [
  {
    name: 'dest',
    description: 'path of alias file',
    required: false
  }
]
Export.description = 'Export the aliases'
Export.storage = new FilesystemStorage()
module.exports = Export
