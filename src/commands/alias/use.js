const AliasBaseCommand = require('../../utilities/AliasBaseCommand')
const FileUtil = require('../../utilities/FileUtility.js')
const CommandUtil = require('../../utilities/CommandUtility.js')
const FilesystemStorage = require('../../utilities/FileSnapshot/FilesystemStorage')
const InquirerPrompts = require('../../utilities/InquirerPrompts')

class Use extends AliasBaseCommand {
  async run () {
    await super.run()

    const { args } = this.parse(Use)

    if (this.validateArguments(args)) {
      let supposedAlias = this.argv.shift()
      const aliasFilePath = new FileUtil(this).getAliasFilePath()
      const db = await Use.storage.load(aliasFilePath)
      const existUtil = new FileUtil(this).extractAlias(supposedAlias, aliasFilePath, db)

      let commandToRun = supposedAlias
      let foundInSuggestions = true

      if (existUtil.index === -2) {
        new FileUtil(this).setupIncompleteWarning()
        return
      } else if (existUtil.index === -1) {
        const exitMessage = 'Continue without using'
        const result = await Use.prompt.findSuggestions(exitMessage, supposedAlias, db)

        if (result === exitMessage) {
          foundInSuggestions = false
        } else {
          commandToRun = db[result]
          supposedAlias = result
        }
      } else if (existUtil.index >= 0) {
        commandToRun = existUtil.command
      }
      if (foundInSuggestions) { console.log(`Using the command ${commandToRun} from alias ${supposedAlias}`) }
      new CommandUtil(this).runCommand(commandToRun, this.argv)
    }
  }

  validateArguments (args) {
    let isValid = true
    let userAlias = ''

    try {
      userAlias = args.alias
    } catch (err) {
      console.log(err)
    }

    if (userAlias === undefined) {
      console.log('Please insert an alias argument')
      isValid = false
    }

    return isValid
  }
}

Use.description = 'Use an alias for a Twilio CLI command'
Use.args = [
  {
    name: 'alias',
    description: 'name of the alias to be used'
  }
]
Use.storage = new FilesystemStorage()
Use.prompt = new InquirerPrompts()
Use.aliases = ['use', ':use']

module.exports = Use
