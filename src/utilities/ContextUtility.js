const { Command } = require('@oclif/command');

class ContextUtility extends Command {
  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    return this.commandContext();
  }


  commandContext() {
    return this;
  }

}

module.exports = ContextUtility