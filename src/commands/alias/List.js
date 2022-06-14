const { args, flags } = require('@oclif/command');
const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
const FileUtil = require('../../utilities/FileUtility.js');
const fs = require('fs');
const FilesystemStorage = require('../../utilities/FileSnapshot/FilesystemStorage');


class List extends AliasBaseCommand {

  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    await super.run();


    const aliasFilePath = new FileUtil(this).getAliasFilePath();
    if (fs.existsSync(aliasFilePath)) {
      
      const db = await List.storage.load(aliasFilePath);
      console.log(db);

  	   	
    }

    else {
      new FileUtil(this).setupIncompleteWarning();
    }

  }




}

List.description = 'view twilio aliases';
List.id = 'alias:List';
List.storage = new FilesystemStorage();

module.exports = List;

