const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
const FileUtil = require('../../utilities/FileUtility.js');
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
      
      const dataDirectory = this.config.dataDir;
      const aliasFolderName = 'alias';
      const aliasFolderPath = dataDirectory + '/' + aliasFolderName;
      const aliasFileName = 'data.json';
      const aliasFilePath = aliasFolderPath + '/' + aliasFileName;
    
    /* Create a new folder in datadirectory folder so as to mainatin the aliases plugin */

    try{
      if(!fs.existsSync(aliasFolderPath)){
        fs.mkdirSync(aliasFolderPath, { recursive: true })
      }
    }
    catch(err){
      return console.log(err);
    }
    

    
    // /** Create a file in the alias folder */
    try {

      if (!fs.existsSync(aliasFilePath)) {
        fs.appendFileSync(aliasFilePath,
          '{\"aliases\":[]}',
          { encoding: "utf8", flag: "w" }
        );

      }

      else {
        console.log('data file already exists');
      }

    } catch (err) {
      console.error(err);
    }


  }



}


Setup.id = 'alias:Setup'
Setup.description = 'set up aliases for your favorite Twilio commands';

module.exports = Setup;