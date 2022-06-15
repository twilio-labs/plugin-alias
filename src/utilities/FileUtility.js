const fs = require('fs');
const AliasObject = require('./AliasObject')
const FilesystemStorage = require('./FileSnapshot/FilesystemStorage');



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
                console.log('please run alias:Setup command first to initiate the plugin setup');
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
                        console.log(`alias already exists for command "${db[userAlias]}". Consider adding -f for overwriting`);
                    }
                        
                        
                }
                else if(operation == 'alias:Delete'){
                    
                    delete db[userAlias];

                }
                
              }
          
              await FileUtility.storage.save(db, aliasFilePath);
              
              
      
          } catch (err) {
            console.log(err);
            console.log('unable to load file');

          }

    }




}

FileUtility.storage = new FilesystemStorage();
module.exports = FileUtility;