const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
const fs = require('fs');
const FileUtil = require('../../utilities/FileUtility.js');

class Import extends AliasBaseCommand {

  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    await super.run();

    const { args } = this.parse(Import)

    if (this.validateArguments(args)) {
      
      const aliasFilePath = new FileUtil(this).getAliasFilePath();
      if (fs.existsSync(aliasFilePath)) {
        const destFile = args["dest"];
        


        //Copy file from destFile to aliasFilePath
        fs.copyFile(destFile, aliasFilePath, (err) => {
          if (err) {
            console.log(err);
          }
          else {
            console.log('import completed');
          }
        });
      }

      else {
        new FileUtil(this).setupIncompleteWarning();
      }

    }

  }

  validateArguments(args) {

    var isValid = true;
    var userPath = '';


    try {
      userPath = args["dest"];
    } catch (err) {
      console.log(err);
    }


    if (userPath == undefined) {
      console.log('please add the path of the alias.json file');
      isValid = false;
    }

    fs.access(userPath, fs.R_OK, (err) => {
      if (err) {
        console.log("alias file does not exist at the specified path");
        isValid = false;
      }
    });

    return isValid;
  }


}

Import.id = 'alias:Import'


Import.args = [
  {
    name: 'dest',
    description: 'path of alias file',
  }
];


Import.description = 'import aliases';
module.exports = Import;