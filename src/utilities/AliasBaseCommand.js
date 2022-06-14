const { Command } = require('@oclif/command');
const fs = require('fs');

class AliasBaseCommand extends Command {
    constructor(argv, config) {
        super(argv, config);
      }

      async run() {

      }

      getAliasFilePath() {
        const dataDirectory = this.config.dataDir;
        //console.log(dataDirectory)
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