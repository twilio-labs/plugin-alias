const os = require('os');
const { args,flags } = require('@oclif/command');
const { BaseCommand, TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const fs = require('fs');
const {cli} = require('cli-ux');




class List extends BaseCommand {

  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    await super.run();

    
    const aliasFilePath = this.getAliasFilePath();
    this.viewAlias(aliasFilePath);

    

  }

  viewAlias(aliasFilePath){
    const file_data = fs.readFileSync(aliasFilePath, 'utf-8');

    try{
      
        const json_data = JSON.parse(file_data);
        console.log("Alias\t\tCommands");
        for (let i = 0; i < json_data["aliases"].length; i++) {
            console.log(json_data["aliases"][i]["name"] + "\t\t" + json_data["aliases"][i]["command"]);
        }
    
      
      } catch(err){
        console.log(err);
        console.log('unable to parse');
      }
      
      

  
    
  }

  getAliasFilePath(){

    const dataDirectory = this.config.dataDir;
    const aliasFolderName = 'alias';
    const aliasFolderPath =  dataDirectory + '/' + aliasFolderName;
    const aliasFileName = 'data.json';
    return aliasFolderPath + '/' + aliasFileName;

  }



}

List.description = 'view twilio aliases';


module.exports = List;


class AliasObject{
  
  constructor(userAlias, userCommand){
    this.name = userAlias;
    this.command = userCommand;
  }

}

