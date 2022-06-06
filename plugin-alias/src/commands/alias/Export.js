const os = require('os');
const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
const AliasObject = require('../../utilities/AliasObject')
const fs = require('fs');

class Export extends AliasBaseCommand {
  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    await super.run();

    //Store the aliases file in the current directory
    const aliasFilePath = this.getAliasFilePath()["aliasFilePath"];
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

// Export.flags = {
//     format: Flags.string({
//         char: 't',                                  // shorter flag version
//         description: 'format to save the json in',  // help description for flag
//         hidden: false,                              // hide from help
//         multiple: false,                            // allow setting this flag multiple times
//         options: ['txt', 'json', 'csv'],            // only allow the value to be from a discrete set
//         default: 'json'             
//       })
// };


Export.description = 'export aliases';
module.exports = Export;