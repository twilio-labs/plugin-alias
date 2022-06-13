const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
const FileUtil = require('../../utilities/FileUtility.js');


//Extenable with params (Use explicit flags for it)
class Use extends AliasBaseCommand {

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
    var commandToRun = supposedAlias;

    if (exist_util["index"] == -2) {
      //Setup incomplete
      console.log('please run alias:Setup command first to initiate the plugin setup')
    } else if (exist_util["index"] < 0) {

    }
    else {
      //console.log(process.argv)

      //process.argv[3] = exist_util["command"];
      this.argv = exist_util["command"];
      //console.log(exist_util["command"])
      //console.log(this.argv)
      commandToRun = exist_util["command"] //+ this.argv
    }

    this.config.runCommand(commandToRun, this.argv);
  }

}

Use.description = 'use an alias in working';

Use.aliases = ['use'];

module.exports = Use;


