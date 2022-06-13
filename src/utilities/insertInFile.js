const fs = require('fs');
function insertInFile(aliasFilePath, json_data) {

    fs.appendFileSync(aliasFilePath,
                      JSON.stringify(json_data),
                      { encoding: "utf8", flag: "w" }
                    );
}

module.exports = insertInFile