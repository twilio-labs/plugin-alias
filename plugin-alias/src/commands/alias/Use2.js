const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
const FileUtil = require('../../utilities/FileUtility.js');


//Extenable with params (Use explicit flags for it)
class Use2 extends AliasBaseCommand {

  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    await super.run();

    if (this.argv.length <= 0) {
      return;
    }

    const supposedAlias = this.argv[0];

    const exist_util = new FileUtil(this).extractAlias(supposedAlias);

    if (exist_util["index"] == -2) {
      //Setup incomplete
      console.log('please run alias:Setup command first to initiate the plugin setup')
    } else if (exist_util["index"] < 0) {

    }
    else {

      process.argv[3] = exist_util["command"];
      this.argv = exist_util["command"];
      this.config.runCommand(exist_util["command"], this.argv);
      this.exit();

    }
  }

}

Use2.description = 'use an alias in working';

Use2.aliases = ['use'];

module.exports = Use2;


