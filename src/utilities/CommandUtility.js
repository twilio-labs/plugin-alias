
class CommandUtility {
  constructor (context) {
    this.ctx = context
  }

  findCommand (id, opts = {}) {
    const command = this.ctx.config.commands.find(c => c.id === id || c.aliases.includes(id))

    if (command) {
      return command
    } else {
      return '{}'
    }
  }

  async runCommand (id, argv = []) {
    const c = this.findCommand(id)
    if (c === '{}') {
      await this.ctx.config.runHook('command_not_found', { id })
      console.log(`command ${id} is not found`)
    } else {
      const command = c.load()
      await this.ctx.config.runHook('prerun', { Command: command, argv })
      const result = await command.run(argv, this.ctx.config)
      await this.ctx.config.runHook('postrun', { Command: command, result, argv })
    }
  }
}

module.exports = CommandUtility
