const { BaseCommand, TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const fs = require('fs');

class AliasBaseCommand extends BaseCommand {
    constructor(argv, config) {
        super(argv, config);
      }

      async run() {

      }

      getAliasFilePath() {
        const dataDirectory = this.config.dataDir;
        const aliasFolderName = 'alias';
        const aliasFolderPath =  dataDirectory + '/' + aliasFolderName;
        const aliasFileName = 'data.json';
        const aliasFilePath = aliasFolderPath + '/' + aliasFileName;
        return {"aliasFolderPath":aliasFolderPath, "aliasFilePath":aliasFilePath};
      }

    validateFlags(flags) {

    }

    validateArguments(args) {

    }

}

module.exports = AliasBaseCommand