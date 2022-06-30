const { Command } = require('@oclif/command')

class ContextUtility extends Command {
  async run () {
    return this.commandContext()
  }

  commandContext () {
    return this
  }
}

module.exports = ContextUtility
