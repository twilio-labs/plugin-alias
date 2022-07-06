
class CommandUtility {
  constructor (context) {
    this.ctx = context
  }

  findCommand (id, _opts = {}) {
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
      console.log(`command ${id} is not found`)
    } else {
      const command = await c.load()
      await this.ctx.config.runHook('prerun', { Command: command, argv })
      const result = await command.run(argv, this.ctx.config)
      await this.ctx.config.runHook('postrun', { Command: command, result, argv })
    }
  }
}

module.exports = CommandUtility
