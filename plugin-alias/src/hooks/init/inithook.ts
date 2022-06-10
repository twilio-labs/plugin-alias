const FileUtil = require('../../utilities/FileUtility.js');
const { Hook } = require('@oclif/core')

async function inithook(opts) {

  console.log('Init for ' + opts.id);

  const exist_util = new FileUtil(this).extractAlias(opts.id);
  if (exist_util["index"] == -2) {
    if (opts.id != 'alias:Setup') {
      //When the file does not ex./binist, run Setup
      console.log('please run alias:Setup command first to initiate the plugin setup')
    }
    else {

    }
  }
  else if (exist_util["index"] >= 0) {
    opts.id = exist_util["command"];
    await this.config.runCommand(exist_util["command"], this.argv);
    this.exit();
  }
  else {
    //continue
  }

}

module.exports = inithook

