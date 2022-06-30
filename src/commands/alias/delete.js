const AliasBaseCommand = require('../../utilities/AliasBaseCommand')
const FileUtil = require('../../utilities/FileUtility.js')
const FilesystemStorage = require('../../utilities/FileSnapshot/FilesystemStorage')

class Delete extends AliasBaseCommand {
  async run () {
    await super.run()

    const { args } = this.parse(Delete)

    if (this.validateArguments(args)) {
      // this.removeAlias(args["name"], '', false);

      const aliasFilePath = new FileUtil(this).getAliasFilePath()
      if (new FileUtil(this).pathExists(aliasFilePath)) {
        const db = await Delete.storage.load(aliasFilePath)
        const updateFile = await new FileUtil(this).updateData(args.name, '', false, this.id, db, aliasFilePath)
        await Delete.storage.save(updateFile, aliasFilePath)
      } else {
        new FileUtil(this).setupIncompleteWarning()
      }
    }
  }

  validateArguments (args) {
    let isValid = true
    let userAlias = ''

    try {
      userAlias = args.name
    } catch (err) {
      console.log(err)
    }

    if (userAlias === undefined) {
      console.log('Please insert an alias argument to delete')
      isValid = false
    }

    return isValid
  }
}

Delete.description = 'Delete an alias'
Delete.id = 'alias:delete'

Delete.args = [

  {
    name: 'name',
    description: 'alias name to delete'
  }
]

Delete.storage = new FilesystemStorage()

module.exports = Delete
