const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
const FileUtil = require('../../utilities/FileUtility.js');
const FilesystemStorage = require('../../utilities/FileSnapshot/FilesystemStorage');

class Export extends AliasBaseCommand {
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

    //Store the aliases file in the current directory
    const aliasFilePath = new FileUtil(this).getAliasFilePath();
    const destFilePath = process.cwd() + '/' + 'dataexport.json';

    if (new FileUtil(this).pathExists(aliasFilePath)) {

      const ans = new FileUtil(this).copyFileToDestination(aliasFilePath, destFilePath, "export");
      if (ans)
        console.log("Export Completed")

    }

    else {
      new FileUtil(this).setupIncompleteWarning();
    }

  }

}


Export.id = 'alias:export'
Export.description = 'export aliases';
Export.storage = new FilesystemStorage();
module.exports = Export;