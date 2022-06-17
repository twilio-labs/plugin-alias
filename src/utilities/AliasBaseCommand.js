const { Command } = require('@oclif/command');
const fs = require('fs');

class AliasBaseCommand extends Command {
    constructor(argv, config) {
        super(argv, config);
      }

      async run() {

      }

    validateFlags(flags) {

    }

    validateArguments(args) {

    }

}

module.exports = AliasBaseCommand