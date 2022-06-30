const { flags } = require('@oclif/command')
const AliasBaseCommand = require('../../utilities/AliasBaseCommand')
const FileUtil = require('../../utilities/FileUtility.js')
const FilesystemStorage = require('../../utilities/FileSnapshot/FilesystemStorage')

class Add extends AliasBaseCommand {
  async run () {
    await super.run()

    const { args, flags } = this.parse(Add)

    if (this.validateArguments(args)) {
      const aliasFilePath = new FileUtil(this).getAliasFilePath()
      if (new FileUtil(this).pathExists(aliasFilePath)) {
        const db = await Add.storage.load(aliasFilePath)
        const updateFile = await new FileUtil(this).updateData(args.name, args.command, this.validateFlags(flags), this.id, db, aliasFilePath)
        await Add.storage.save(updateFile, aliasFilePath)
      } else {
        new FileUtil(this).setupIncompleteWarning()
      }
    }
  }

  validateFlags (flags) {
    let hasFlag = true
    let userFlag = true

    try {
      userFlag = flags.force
    } catch (err) {
      console.log('invalid flags. See ./bin/run alias:add --help')
    }

    if (userFlag === undefined) {
      hasFlag = false
    }

    return hasFlag
  }

  validateArguments (args) {
    let isValid = true
    let userAlias = ''
    let userCommand = ''

    try {
      userAlias = args.name
    } catch (err) {
      console.log('invalid arguments. See ./bin/run alias:add --help')
    }

    try {
      userCommand = args.command
    } catch (err) {
      console.log('invalid arguments. See ./bin/run alias:add --help')
    }

    if (userAlias === undefined) {
      console.log('Please insert an alias argument')
      isValid = false
    }

    if (userCommand === undefined) {
      console.log('Please insert the command to alias')
      isValid = false
    }

    return isValid
  }
}

Add.id = 'alias:add'
Add.description = 'Create a new alias to access Twilio CLI commands'

Add.flags = {
  force: flags.boolean({ char: 'f', description: 'Force overwrite the alias if it already exists' })
}

Add.args = [
  {
    name: 'name',
    description: 'alias name to add'
  },
  {
    name: 'command',
    description: 'command to be aliased'
  }
]

Add.storage = new FilesystemStorage()
module.exports = Add
