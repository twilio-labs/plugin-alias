const { args, flags } = require('@oclif/command');
const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
const FileUtil = require('../../utilities/FileUtility.js');
const fs = require('fs');


class List extends AliasBaseCommand {

  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    await super.run();


    const aliasFilePath = new FileUtil(this).getAliasFilePath();
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
      console.log("Alias\tCommands");
      for (let i = 0; i < json_data["aliases"].length; i++) {
        console.log(json_data["aliases"][i]["name"] + "\t" + json_data["aliases"][i]["command"]);
      }

    }

    catch (err) {
      console.log('unable to parse');
    }

  }

}



List.description = 'view twilio aliases';
List.id = 'alias:List';
module.exports = List;

