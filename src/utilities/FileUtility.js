const fs = require('fs');
const AliasObject = require('./AliasObject')
const FilesystemStorage = require('./FileSnapshot/FilesystemStorage');
const chalk = require('chalk');

class FileUtility {

    constructor(context) {
        this.ctx = context
    }

    extractAlias(userAlias, aliasFilePath,db) {
        
        if (fs.existsSync(aliasFilePath)) {
    
            return this.parseData(userAlias, aliasFilePath,db);

        }

        else {
            return { "command": 'no-set-up', "index": -2 };
        }



    }

    getAliasFilePath() {
        const dataDirectory = this.ctx.config.dataDir;
        const aliasFolderName = 'alias';
        const aliasFolderPath = dataDirectory + '/' + aliasFolderName;
        const aliasFileName = 'data.json';
        const aliasFilePath = aliasFolderPath + '/' + aliasFileName;
        return aliasFilePath;
    }


    parseData(userAlias, aliasFilePath,db) {

        if(db[userAlias]){
            return { "command": db[userAlias], "index": 0 };
        }
        else{
            return { "command": 'no-alias', "index": -1 };
        }

    }


    async updateData(userAlias, userCommand, hasFlag, operation){

        
        try {
            const aliasFilePath =  this.getAliasFilePath();
            const db = await FileUtility.storage.load(aliasFilePath);
            const exist_util = this.extractAlias(userAlias, aliasFilePath,db);
            const aliasIndex = exist_util["index"];
            

            //This will never run for snapshot based memory reference
            if(aliasIndex == -2){
                this.setupIncompleteWarning();
            }

            
            
            else if (aliasIndex == -1) {
          
                //no alias exists. Add is operation is Add, else show error for delete
                if(operation == 'alias:Add'){
                    
                    db[userAlias] = userCommand;
                    
                }
                else if(operation == 'alias:Delete'){
                    console.log('alias does not exist');
                }

             }else {
                
                
                if(operation == 'alias:Add'){

                    
                    if(db[userAlias] === 'null' || hasFlag){
                        db[userAlias] = userCommand;
                    }
                    else {
                        console.log('alias already exists. Consider adding -f for overwriting');
                    }
                        
                        
                }
                else if(operation == 'alias:Delete'){

                        db[userAlias] = 'null';
                }
                
              }
          
              await FileUtility.storage.save(db, aliasFilePath);
              
                
              
      
          } catch (err) {
            
            console.log('unable to load file');

          }

    }

    setupIncompleteWarning() {
      const AUTOCOMLETE_ALERT = `If you are running alias command for the first time, please run the following setup command to initiate the plugin setup: \n 
      '${chalk.bold('oclif-example alias:Setup')}'`;
      console.warn(chalk.yellowBright(` » ${AUTOCOMLETE_ALERT}`));
    }

}

FileUtility.storage = new FilesystemStorage();
module.exports = FileUtility;
