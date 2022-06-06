const os = require('os');
const { args, flags } = require('@oclif/command');
const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
const fs = require('fs');
const { cli } = require('cli-ux');

class List extends AliasBaseCommand {

  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    await super.run();


    const aliasFilePath = this.getAliasFilePath()["aliasFilePath"];
    if (fs.existsSync(aliasFilePath)) {
      this.viewAlias(aliasFilePath);
    }

    else {
      console.log('please run alias:Setup command first to initiate the plugin setup')
    }

  }

  viewAlias(aliasFilePath) {
    const file_data = fs.readFileSync(aliasFilePath, 'utf-8');

    try {
      const json_data = JSON.parse(file_data);
      console.log("Alias\t\tCommands");
      for (let i = 0; i < json_data["aliases"].length; i++) {
        console.log(json_data["aliases"][i]["name"] + "\t\t" + json_data["aliases"][i]["command"]);
      }

    }

    catch (err) {
      console.log(err);
      console.log('unable to parse');
    }

  }

}

List.description = 'view twilio aliases';

module.exports = List;

