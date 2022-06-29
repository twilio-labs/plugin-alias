const { args, flags } = require('@oclif/command');
const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
const FileUtil = require('../../utilities/FileUtility.js');
const FilesystemStorage = require('../../utilities/FileSnapshot/FilesystemStorage');


class List extends AliasBaseCommand {

  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    await super.run();

    if (this.argv.length > 0) {

      var args = "";
      for (var arg in this.argv) {
        args += "'" + this.argv[arg] + "' ";
      }
      console.log(`Invalid argument ${args}provided`);
      return;
    }


    const aliasFilePath = new FileUtil(this).getAliasFilePath();
    if (new FileUtil(this).pathExists(aliasFilePath)) {

      const db = await List.storage.load(aliasFilePath);
      var output = "Alias\tCommand"

      for (let alias in db) {
        output += `\n${alias}\t${db[alias]}`;
      }

      console.log(output)

    }

    else {
      new FileUtil(this).setupIncompleteWarning();
    }

  }




}

List.description = 'view twilio aliases';
List.id = 'alias:list';
List.storage = new FilesystemStorage();

module.exports = List;

