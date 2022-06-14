const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
const FileUtil = require('../../utilities/FileUtility.js');
const CommandUtil = require('../../utilities/CommandUtility.js');


class Use extends AliasBaseCommand {

  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    await super.run();

    if (this.argv.length <= 0) {
      return;
    }

    const supposedAlias = this.argv.shift();

    const exist_util = new FileUtil(this).extractAlias(supposedAlias);
    var commandToRun = supposedAlias;

    if (exist_util["index"] == -2) {
      //Setup incomplete
      console.log('please run alias:Setup command first to initiate the plugin setup')
      return;
    }
    
    else if (exist_util["index"] >= 0) {
        commandToRun = exist_util["command"] //+ this.argv
     }
    
    new CommandUtil(this).runCommand(commandToRun, this.argv);

  }



}

Use.description = 'use an alias in working';

Use.aliases = ['use'];

module.exports = Use;


