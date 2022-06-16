const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
const FileUtil = require('../../utilities/FileUtility.js');
const fs = require('fs');
const FilesystemStorage = require('../../utilities/FileSnapshot/FilesystemStorage');

class Setup extends AliasBaseCommand {
  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    await super.run();

    /*  
      Whenever setup of Plugin is initiated, find the main directory where CLI is installed and create a data.json file
      This data.json file has a semi-structured format of key-value pairs 
    */

    const mPath = String(new FileUtil(this).getAliasFilePath())
    const aliasFolderPath = mPath.substr(0, mPath.length - 10);
    const aliasFilePath = new FileUtil(this).getAliasFilePath();

    try {
      if (!fs.existsSync(aliasFolderPath)) {
        fs.mkdirSync(aliasFolderPath, { recursive: true })
      }
    }
    catch (err) {
      return console.log(err);
    }

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


Setup.id = 'alias:Setup'
Setup.description = 'set up aliases for your favorite Twilio commands';
Setup.storage = new FilesystemStorage();
module.exports = Setup;