const { args, flags } = require('@oclif/command');
const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
const FileUtil = require('../../utilities/FileUtility.js');

class Add extends AliasBaseCommand {

  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    await super.run();

    const { args, flags } = this.parse(Add)

    //Parse the aruguments and pass validations
    if (this.validateArguments(args)) {
      
      this.addAlias(args["name"], args["command"], this.validateFlags(flags));
    
    }

  }

  addAlias(userAlias, userCommand, hasFlag){
    
    const updateFile= new FileUtil(this).updateData(userAlias, userCommand, hasFlag, this.id);
    console.log(updateFile);
  }

  


  validateFlags(flags) {
    var hasFlag = true;
    var userFlag = true;

    try {
      userFlag = flags["force"];
    }
    catch (err) {
      console.log(err)
    }

    if (userFlag == undefined) {
      hasFlag = false;
    }

    return hasFlag;
  }

  validateArguments(args) {

    var isValid = true;
    var userAlias = '';
    var userCommand = '';

    try {
      userAlias = args["name"];
    } catch (err) {
      console.log(err);

    }

    try {
      userCommand = args["command"];
    } catch (err) {
      console.log(err);
    }


    if (userAlias == undefined) {
      console.log('Please insert an alias argument');
      isValid = false;
    }

    if (userCommand == undefined) {
      console.log('Please insert the command to alias')
      isValid = false;
    }

    return isValid;

  }

}

Add.id = 'alias:Add';
Add.description = 'create a new alias to access Twilio CLI commands';


Add.flags = {
  force: flags.boolean({ char: 'f', description: 'Force overwrite the alias if it already exists' })
};

Add.args = [
  {
    name: 'name',
    description: 'alias name to add',
  },
  {
    name: 'command',
    description: 'command to be aliased',
  },
];

module.exports = Add;

