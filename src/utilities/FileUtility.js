const fs = require('fs');
const AliasObject = require('./AliasObject')

class FileUtility {

    constructor(context) {
        this.ctx = context
    }

    extractAlias(userAlias) {
        const aliasFilePath = this.getAliasFilePath();


        if (fs.existsSync(aliasFilePath)) {
            return this.parseData(userAlias, aliasFilePath);

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


    parseData(userAlias, aliasFilePath) {

        const file_data = fs.readFileSync(aliasFilePath, 'utf-8');

        try {
            const json_data = JSON.parse(file_data);
            return this.findAlias(userAlias, json_data)
        } catch (err) {
            console.log(err);
            console.log('unable to parse');
        }

    }

    readData(aliasFilePath){
        const file_data = fs.readFileSync(aliasFilePath, 'utf-8');

        try {
            const json_data = JSON.parse(file_data);
            return json_data;
        } catch (err) {
            console.log(err);
            console.log('unable to parse');
        }
        
    }

    findAlias(userAlias, json_data) {


        for (let i = 0; i < json_data["aliases"].length; i++) {
            if (json_data["aliases"][i]["name"] == userAlias) {
                return { "command": json_data["aliases"][i]["command"], "index": i };
            }
        }

        return { "command": 'no-alias', "index": -1 };
    }

    updateData(userAlias, userCommand, hasFlag, operation){


        try {

            const exist_util = this.extractAlias(userAlias);
            
            if(exist_util["index"] == -2){
                return 'please run alias:Setup command first to initiate the plugin setup';
            }

            const aliasFilePath =  this.getAliasFilePath();
            const json_data = this.readData(aliasFilePath);
            const aliasObj = new AliasObject(userAlias, userCommand);
            const aliasIndex = exist_util["index"];

            if (aliasIndex == -2) {
                //Setup incomplete
                return 'please run alias:Setup command first to initiate the plugin setup';
            } else if (aliasIndex == -1) {
          
                //no alias exists. Add is operation is Add, else show error for delete
                if(operation == 'alias:Add'){
                    json_data["aliases"].push(aliasObj);
                }
                else if(operation == 'alias:Delete'){
                    return 'alias does not exist';
                }

              }else {
                
                
                if(operation == 'alias:Add'){
                    
                        if (hasFlag) {
                            json_data["aliases"][aliasIndex]["command"] = userCommand;
                            
                        }
                        else {
                           return 'alias already exists. Consider adding -f for overwriting';
                        }
                }
                else if(operation == 'alias:Delete'){

                        json_data["aliases"].splice(aliasIndex, 1);   

                }
                
              }
          
            
            return this.insertInFile(aliasFilePath, json_data);
      
          } catch (err) {
            
            return 'unable to load file';

          }

    }

    insertInFile(aliasFilePath, json_data) {

        fs.appendFileSync(aliasFilePath,
            JSON.stringify(json_data),
            { encoding: "utf8", flag: "w" }
        );

        
        return 'data file updated';
    }




}

module.exports = FileUtility;