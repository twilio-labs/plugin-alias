const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
const FileUtil = require('../../utilities/FileUtility.js');
const FilesystemStorage = require('../../utilities/FileSnapshot/FilesystemStorage');

class Setup extends AliasBaseCommand {
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

    /*  
      Whenever setup of Plugin is initiated, find the main directory where CLI is installed and create a data.json file
      This data.json file has a semi-structured format of key-value pairs 
    */

    const mPath = String(new FileUtil(this).getAliasFilePath())
    const aliasFolderPath = (mPath.length > 10 ? mPath.substr(0, mPath.length - 10) : "");
    const aliasFilePath = new FileUtil(this).getAliasFilePath();

    let proceed = { move: true };
    new FileUtil(this).createFolderIfDoesNotExists(aliasFolderPath, proceed);
    //console.log(proceed)
    if (!proceed.move)
      return;

    try {
      const db = await Setup.storage.load(aliasFilePath);
      await Setup.storage.save(db, aliasFilePath);
      console.log('setup complete');

    } catch (err) {

      console.log('setup incomplete');
      return;
    }

  }



}


Setup.id = 'alias:setup'
Setup.description = 'set up aliases for your favorite Twilio commands';
Setup.storage = new FilesystemStorage();
module.exports = Setup;