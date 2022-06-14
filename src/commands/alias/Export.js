const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
const fs = require('fs');
const FileUtil = require('../../utilities/FileUtility.js');


class Export extends AliasBaseCommand {
  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    await super.run();

    //Store the aliases file in the current directory
    const aliasFilePath = new FileUtil(this).getAliasFilePath();
    const destFilePath = process.cwd() + '/' + 'dataexport.json';

    if (fs.existsSync(aliasFilePath)) {

      try {
        fs.copyFileSync(aliasFilePath, destFilePath);
        console.log(destFilePath);
      } catch (err) {
        console.log(err);
      }

    }

    else {
      console.log('please run alias:Setup command first to initiate the plugin setup')
    }

  }

}


Export.id = 'alias:Export'
Export.description = 'export aliases';
module.exports = Export;