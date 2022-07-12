const { Command } = require('@oclif/core')

class ContextUtility extends Command {
  async run () {
    return this.commandContext()
  }

  commandContext () {
    return this
  }
}

module.exports = ContextUtility
