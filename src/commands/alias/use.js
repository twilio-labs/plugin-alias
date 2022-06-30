const AliasBaseCommand = require('../../utilities/AliasBaseCommand')
const FileUtil = require('../../utilities/FileUtility.js')
const CommandUtil = require('../../utilities/CommandUtility.js')
const FilesystemStorage = require('../../utilities/FileSnapshot/FilesystemStorage')
const InquirerPrompts = require('../../utilities/InquirerPrompts')

class Use extends AliasBaseCommand {
  async run () {
    await super.run()

    if (this.argv.length <= 0) {
      console.log('Please insert an alias argument')
      return
    }

    let supposedAlias = this.argv.shift()
    const aliasFilePath = new FileUtil(this).getAliasFilePath()
    const db = await Use.storage.load(aliasFilePath)
    const existUtil = new FileUtil(this).extractAlias(supposedAlias, aliasFilePath, db)

    let commandToRun = supposedAlias
    let foundInSuggestions = true

    if (existUtil.index === -2) {
      // Setup incomplete
      new FileUtil(this).setupIncompleteWarning()
      return
    } else if (existUtil.index === -1) {
      const exitMessage = 'Continue without using'
      const result = await Use.prompt.findSuggestions(exitMessage, supposedAlias, db)

      if (result === exitMessage) {
        // console.warn(`${userAlias} is not a ${this.ctx.config.bin} command.`);
        foundInSuggestions = false
      } else {
        commandToRun = db[result]
        supposedAlias = result
      }
    } else if (existUtil.index >= 0) {
      commandToRun = existUtil.command // + this.argv
    }

    if (foundInSuggestions) { console.log(`Using the command ${commandToRun} from alias ${supposedAlias}`) }

    new CommandUtil(this).runCommand(commandToRun, this.argv)
  }
}

Use.description = 'Use an alias for a Twilio CLI command'
Use.storage = new FilesystemStorage()
Use.prompt = new InquirerPrompts()
Use.aliases = ['use']

module.exports = Use
