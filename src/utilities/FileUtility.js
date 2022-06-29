/*eslint-env es6*/
const FilesystemStorage = require('./FileSnapshot/FilesystemStorage');
const chalk = require('chalk');
const InquirerPrompts = require('./InquirerPrompts');




class FileUtility {

    constructor(context) {
        this.ctx = context
    }

    extractAlias(userAlias, aliasFilePath, db) {

        if (this.pathExists(aliasFilePath)) {

            return this.parseData(userAlias, aliasFilePath, db);

        }

        else {
            return { "command": 'no-set-up', "index": -2 };
        }



    }

    getAliasFilePath(config = this.ctx.config) {
        return FileUtility.storage.path(config);
    }


    parseData(userAlias, aliasFilePath, db) {

        if (db[userAlias]) {
            return { "command": db[userAlias], "index": 0 };
        }
        else {
            return { "command": 'no-alias', "index": -1 };
        }

    }


    async updateData(userAlias, userCommand, hasFlag, operation, db, aliasFilePath) {


        try {

            const exist_util = this.extractAlias(userAlias, aliasFilePath, db);
            const aliasIndex = exist_util["index"];

            //This will never run for snapshot based memory reference
            if (aliasIndex == -2) {
                return this.setupIncompleteWarning();
            }



            else if (aliasIndex == -1) {

                //no alias exists. Add is operation is Add, else show error for delete
                if (operation == 'alias:add') {

                    db[userAlias] = userCommand;

                }
                else if (operation == 'alias:delete') {
                    const exit_message = 'Continue without deleting'
                    const result = await new InquirerPrompts(this.ctx, exit_message, userAlias, db).findSuggestions();

                    if (result === exit_message) {
                        console.warn(`${userAlias} is not a ${this.ctx.config.bin} command.`);
                    }
                    else {
                        delete db[result];
                    }

                }

            } else {


                if (operation == 'alias:add') {


                    if (db[userAlias] === 'null' || hasFlag) {
                        db[userAlias] = userCommand;
                    }
                    else {
                        console.log(`alias already exists for command "${db[userAlias]}". Consider adding -f for overwriting`);
                    }


                }
                else if (operation == 'alias:delete') {

                    delete db[userAlias];

                }

            }

            return db;



        } catch (err) {
            console.log(err);
            console.log('unable to load file');

        }

    }

    setupIncompleteWarning() {
        const AUTOCOMLETE_ALERT = `If you are running alias command for the first time, please run the following setup command to initiate the plugin setup: \n 
      '${chalk.bold('twilio alias:setup')}'`;
        return console.warn(chalk.yellowBright(` » ${AUTOCOMLETE_ALERT}`));
    }

    pathExists(path) {
        return FileUtility.storage.pathExists(path);
    }

    importPathExists(path) {
        return FileUtility.storage.importPathExists(path);
    }

    createFolderIfDoesNotExists(folderPath, proceed) {
        try {
            if (!this.pathExists(folderPath)) {
                FileUtility.storage.makeDirectory(folderPath);
                proceed.move = true;
            }
            else {
                console.log('setup already complete');
                proceed.move = false;
            }
        }
        catch (err) {
            console.log(err);
            proceed.move = false;
        }
    }

    copyFileToDestination(sourcePath, destPath, mode) {
        try {
            FileUtility.storage.copyFile(sourcePath, destPath, mode);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    removeDirectory(dir) {
        FileUtility.storage.removeDirectory(dir);
    }



}

FileUtility.storage = new FilesystemStorage();
module.exports = FileUtility;
