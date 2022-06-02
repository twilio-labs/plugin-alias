const os = require('os');

const { flags } = require('@oclif/command');
const { BaseCommand, TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const fs = require('fs');



class Add extends BaseCommand {

  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    await super.run();

    const {args, flags} = this.parse(Add)
    
    //Parse the aruguments and pass validations
    if(this.validateArguments(args)){

        //Check for flags
        const hasFlag = this.validateFlags(flags);
        const userCommand = args["command"];
        const userAlias = args["name"];


        
        const aliasFilePath = this.getAliasFilePath();

        if(fs.existsSync(aliasFilePath)){
          
          
          this.addAlias(userAlias, userCommand, hasFlag, aliasFilePath);

          

  
        }

        else{

          console.log('please run alias: setup command first to initiate the plugin setup')

        }


    }
    
    

    

  }

  addAlias(userAlias, userCommand, hasFlag, aliasFilePath){

      //We have valid arguments and the aliasFilePath exists
      const file_data = fs.readFileSync(aliasFilePath, 'utf-8');
      
      try{
      
        const json_data = JSON.parse(file_data);
      
        
        
        const aliasObj = new AliasObject(userAlias, userCommand);
        const exist_util = this.findAlias(userAlias, userCommand, json_data);
        const alias_exists = exist_util["exist"];
        const alias_at = exist_util["index"]; 
        
        
        if(!alias_exists){
          json_data["aliases"].push(aliasObj);
        }
        
        else{
          if(hasFlag){
            
              json_data["aliases"][alias_at]["command"] = userCommand;

          }
          else{
              console.log('alias already exists. Consider adding -f for overwriting');
          }
        }

    
      
        this.insertInFile(aliasObj,aliasFilePath, json_data);
      
      } catch(err){
        console.log(err);
        console.log('unable to parse');
      }
      
      

      
      

  }

  insertInFile(aliasObj,aliasFilePath, json_data){

      
      fs.appendFileSync(aliasFilePath,
                        JSON.stringify(json_data),
                        { encoding: "utf8", flag: "w" }
                      );


        return;
  }


  findAlias(userAlias, userCommand, json_data){


      for (let i = 0; i < json_data["aliases"].length; i++) {
        
        if(json_data["aliases"][i]["name"] == userAlias){
          return {"exist": true, "index": i};;
        }
      }

      return {"exist": false, "index": -1};
  }

  getAliasFilePath(){

    const dataDirectory = this.config.dataDir;
    const aliasFolderName = 'alias';
    const aliasFolderPath =  dataDirectory + '/' + aliasFolderName;
    const aliasFileName = 'data.json';
    return aliasFolderPath + '/' + aliasFileName;

  }

  validateFlags(flags){
    var hasFlag = true;

    var userFlag = true;
    try{
      userFlag = flags["force"];
    }
    catch(err){
      console.log(err)
    }

    if(userFlag == undefined){
      hasFlag = false;
    }

    return hasFlag;
  }

  validateArguments(args){

    var isValid = true;
    var userAlias = '';
    var userCommand= '';

    try{
        userAlias = args["name"];
    } catch(err){
        console.log(err);
        
    }

    try{
        userCommand= args["command"];
    } catch(err){
        console.log(err);
    }


    if(userAlias == undefined){
      console.log('Please insert an alias argument');
      isValid = false;
    }

    if(userCommand == undefined){
      console.log('Please insert the command to alias')
      isValid = false;
    }
    

    return isValid;

  }



}

Add.description = 'create a new alias to access Twilio CLI commands';

Add.flags = {
  force: flags.boolean({ char: 'f', description: 'Force overwrite the alias if it already exists'})
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


class AliasObject{
  
  constructor(userAlias, userCommand){
    this.name = userAlias;
    this.command = userCommand;
  }

}

