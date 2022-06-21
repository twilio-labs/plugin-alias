const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
const fs = require('fs');
const FileUtil = require('../../utilities/FileUtility.js');


class Reset extends AliasBaseCommand {
  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    await super.run();

    //Store the aliases file in the current directory
    const mPath = String(new FileUtil(this).getAliasFilePath())
    const aliasFolderPath = mPath.substr(0, mPath.length - 10);

    try {
      if (fs.existsSync(aliasFolderPath)) {
        const dir = aliasFolderPath;
        fs.rm(dir, { recursive: true }, (err) => {
          if (err) {
            throw err;
          }


        });

      }

      console.log('reset complete');

    }
    catch (err) {
      return console.log(err);
    }




  }

}
Reset.hidden = true;
Reset.id = 'alias:reset'
Reset.description = 'reset to empty';
module.exports = Reset;