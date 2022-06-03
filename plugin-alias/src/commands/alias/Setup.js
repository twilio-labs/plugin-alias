const os = require('os');
const  AliasBaseCommand  = require('../../utilities/AliasBaseCommand');
const fs = require('fs');

class Setup extends AliasBaseCommand {
  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    await super.run();

    /*  
      Whenever setup of Plugin is initiated, find the main directory where CLI is installed and create a data.json file
      This data.json file has a semi-structured format of key-value pairs 
    */
    
    // const dataDirectory = this.config.dataDir
    // const aliasFolderName = 'alias'
    // const aliasFolderPath =  dataDirectory + '/' + aliasFolderName
    // const aliasFileName = 'data.json'
    // const aliasFilePath = aliasFolderPath + '/' + aliasFileName

    const aliasFolderPath = this.getAliasFilePath()["aliasFolderPath"]
    const aliasFilePath = this.getAliasFilePath()["aliasFilePath"]

    /* Create a new folder in .twilio_cli forlder so as to mainatin the aliases plugin */

    try {
      if (!fs.existsSync(aliasFolderPath)) {
        fs.mkdirSync(aliasFolderPath);
      }
    } catch (err) {
      //Log error in console
      console.error(err);
    }

    /** Create a file in the alias folder */
    try{
      
      if(!fs.existsSync(aliasFilePath)){
          fs.appendFileSync(aliasFilePath,
                            '{\"aliases\":[]}',
          { encoding: "utf8", flag: "w" }
          );
        
      }

      else{
        console.log('data file already exists');
      }
      
    } catch(err){
        console.error(err);
    }
  }

}

Setup.description = 'set up aliases for your favorite Twilio commands';
module.exports = Setup;