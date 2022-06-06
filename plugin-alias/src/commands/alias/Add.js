const os = require('os');
const { flags } = require('@oclif/command');
const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
const AliasObject = require('../../utilities/AliasObject')
const findAlias = require('../../utilities/findAlias')
const insertInFile = require('../../utilities/insertInFile')
const fs = require('fs');

class Add extends AliasBaseCommand {

  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    await super.run();

    const { args, flags } = this.parse(Add)

    //Parse the aruguments and pass validations
    if (this.validateArguments(args)) {

      //Check for flags
      const hasFlag = this.validateFlags(flags);
      const userCommand = args["command"];
      const userAlias = args["name"];

      const aliasFilePath = this.getAliasFilePath()["aliasFilePath"];

      if (fs.existsSync(aliasFilePath)) {
        this.addAlias(userAlias, userCommand, hasFlag, aliasFilePath);
      }

      else {
        console.log('please run alias:Setup command first to initiate the plugin setup')
      }
    }

  }

  addAlias(userAlias, userCommand, hasFlag, aliasFilePath) {

    //We have valid arguments and the aliasFilePath exists
    const file_data = fs.readFileSync(aliasFilePath, 'utf-8');

    try {
      const json_data = JSON.parse(file_data);
      const aliasObj = new AliasObject(userAlias, userCommand);
      const exist_util = findAlias(userAlias, json_data);
      const alias_exists = exist_util["exist"];
      const alias_at = exist_util["index"];


      if (!alias_exists) {
        json_data["aliases"].push(aliasObj);
      }

      else {
        if (hasFlag) {
          json_data["aliases"][alias_at]["command"] = userCommand;
        }
        else {
          console.log('alias already exists. Consider adding -f for overwriting');
        }
      }

      insertInFile(aliasFilePath, json_data);

    } catch (err) {
      console.log(err);
      console.log('unable to parse');
    }

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

