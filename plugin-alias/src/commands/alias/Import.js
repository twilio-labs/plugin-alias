const os = require('os');
const  AliasBaseCommand  = require('../../utilities/AliasBaseCommand');
const AliasObject = require('../../utilities/AliasObject')
const fs = require('fs');

class Import extends AliasBaseCommand {

  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    await super.run();

    const {args} = this.parse(Import)
    
    if(this.validateArguments(args)){
      const aliasFilePath = this.getAliasFilePath()["aliasFilePath"];

      if(fs.existsSync(aliasFilePath)){     
        const destFile  = args["dest"];


        //Copy file from destFile to aliasFilePath
        fs.copyFile(destFile, aliasFilePath, (err) => {
            if (err){
                console.log(err);
            }
            else{
                console.log('import completed');
            }
        });
      }

      else {
        console.log('please run alias: setup command first to initiate the plugin setup')
      }

    }

  }

  validateArguments(args){

    var isValid = true;
    var userPath = '';


    try{
        userPath= args["dest"];
    } catch(err){
        console.log(err);
    }


    if(userPath == undefined){
      console.log('please add the path of the alias.json file');
      isValid = false;
      return isValid;
    }

    fs.access(userPath, fs.R_OK, (err) => {
        if (err) { 
            console.log("alias file does not exist at the specified path");
            isValid = false;
        }
    });

    return isValid;
  }

  // getAliasFilePath(){

  //   const dataDirectory = this.config.dataDir;
  //   const aliasFolderName = 'alias';
  //   const aliasFolderPath =  dataDirectory + '/' + aliasFolderName;
  //   const aliasFileName = 'data.json';
  //   return aliasFolderPath + '/' + aliasFileName;

  // }

  

}

Import.args = [
    {
      name: 'dest',
      description: 'path of alias file',
    }
  ];
  

Import.description = 'import aliases';
module.exports = Import;