const os = require('os');
const { args, flags } = require('@oclif/command');
const fs = require('fs');
const { spawn } = require("child_process");
const { exec } = require('child_process');
const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
const AliasObject = require('../../utilities/AliasObject')
const findAlias = require('../../utilities/findAlias')

//Extenable with params (Use explicit flags for it)
class Use extends AliasBaseCommand {

  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    await super.run();

    const { args, flags } = this.parse(Use);


    //Parse the aruguments and pass validations
    if (this.validateArguments(args)) {

      const userAlias = args["name"];
      const aliasFilePath = this.getAliasFilePath()["aliasFilePath"];

      if (fs.existsSync(aliasFilePath)) {
        this.useAlias(userAlias, aliasFilePath, flags);
      }

      else {
        console.log('please run alias:Setup command first to initiate the plugin setup')
      }
    }

  }

  useAlias(userAlias, aliasFilePath, flags) {

    //We have valid arguments and the aliasFilePath exists
    const file_data = fs.readFileSync(aliasFilePath, 'utf-8');

    try {
      const json_data = JSON.parse(file_data);
      const exist_util = findAlias(userAlias, json_data);
      const alias_exists = exist_util["exist"];
      const alias_at = exist_util["index"];

      if (!alias_exists) {
        console.log('invalid alias. Consider adding using twilio alias:Add {name} {command}');
      }

      else {

        var userCommand = json_data["aliases"][alias_at]["command"];

        const userFlags = this.validateFlags(flags);
        const args_exists = userFlags["exist"];
        const args_user = userFlags["userargs"];

        if (args_exists) {
          for (let i = 0; i < args_user.length; i++) {
            userCommand = userCommand + "  " + args_user[i];
          }
        }
        console.log('using command ' + userCommand);

        this.runChildProcess(userCommand);

      }

    } catch (err) {
      console.log(err);
      console.log('unable to parse');
    }

  }


  runChildProcess(userCommand) {


    //Create a child process that takes the commands
    //We use spawn to execute command in a new child process and add listeners to it as well


    // var sourceData = exec(userCommand,
    //   (error, stdout, stderr) => {
    //     console.log(stdout);
    //     console.log(stderr);
    //     if (error !== null) {
    //       console.log(`exec error: ${error}`);
    //     }
    //   });

  }


  validateFlags(flags) {

    var userFlags = [];

    try {
      userFlags = flags["commandargs"];
    } catch (err) {
      console.log(err);
    }
    if (userFlags == undefined) {

      return { "exist": false, "userargs": [] };
    }

    return { "exist": true, "userargs": userFlags };

  }
  validateArguments(args) {

    var isValid = true;
    var userAlias = '';

    try {
      userAlias = args["name"];
    }
    catch (err) {
      console.log(err);
    }

    if (userAlias == undefined) {
      console.log('Please insert an alias argument');
      isValid = false;
    }

    return isValid;

  }

}

Use.description = 'use an alias in working';

Use.args = [
  {
    name: 'name',
    description: 'alias name to use',
    required: true
  }
];


Use.flags = {
  commandargs: flags.string({ char: 'a', description: 'add arguments to the command argument', multiple: true })
};


module.exports = Use;


