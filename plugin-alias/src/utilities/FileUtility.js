const fs = require('fs');
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

    findAlias(userAlias, json_data) {


        for (let i = 0; i < json_data["aliases"].length; i++) {
            if (json_data["aliases"][i]["name"] == userAlias) {
                return { "command": json_data["aliases"][i]["command"], "index": i };
            }
        }

        return { "command": 'no-alias', "index": -1 };
    }



    insertInFile(aliasFilePath, json_data) {

        fs.appendFileSync(aliasFilePath,
            JSON.stringify(json_data),
            { encoding: "utf8", flag: "w" }
        );
    }



}

module.exports = FileUtility;