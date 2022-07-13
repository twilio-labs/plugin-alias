/* eslint-env es6 */
const FilesystemStorage = require('./FileSnapshot/FilesystemStorage')
const chalk = require('chalk')
const InquirerPrompts = require('./InquirerPrompts')

class FileUtility {
  constructor (context) {
    this.ctx = context
  }

  extractAlias (userAlias, aliasFilePath, db) {
    if (this.pathExists(aliasFilePath)) {
      return this.parseData(userAlias, aliasFilePath, db)
    } else {
      return { command: 'no-set-up', index: -2 }
    }
  }

  getAliasFilePath (config = this.ctx.config) {
    return FileUtility.storage.path(config)
  }

  parseData (userAlias, _aliasFilePath, db) {
    if (db[userAlias]) {
      return { command: db[userAlias], index: 0 }
    } else {
      return { command: 'no-alias', index: -1 }
    }
  }

  async updateAddData (userAlias, userCommand, hasFlag, _operation, db, aliasFilePath) {
    try {
      const existUtil = this.extractAlias(userAlias, aliasFilePath, db)
      const aliasIndex = existUtil.index
      const storedAliases = Object.keys(db)
      const aliasForUserCommand = storedAliases.find(alias => db[alias] === userCommand)
      let added = false

      if (aliasForUserCommand === undefined) {
        if (aliasIndex === -1 || (db[userAlias] === 'null' || hasFlag)) {
          db[userAlias] = userCommand
          added = true
        } else {
          console.log(`This alias already exists for command "${db[userAlias]}". Consider adding -f for overwriting`)
        }
      } else {
        console.log(`This command already exists for alias "${aliasForUserCommand}"! Consider updating the alias`)
      }
      if (added) {
        console.log(`Successfully created alias ${userAlias} for ${userCommand}`)
      }

      return db
    } catch (err) {
      console.log(err)
      console.log('unable to load file')
    }
  }

  async updateDeleteData (userAlias, _userCommand, _hasFlag, _operation, db, aliasFilePath) {
    try {
      const existUtil = this.extractAlias(userAlias, aliasFilePath, db)
      const aliasIndex = existUtil.index

      let deleted = false

      if (aliasIndex === -1) {
        // no alias exists. Add is operation is Add, else show error for delete
        const exitMessage = 'Continue without deleting'
        const result = await FileUtility.prompt.findSuggestions(exitMessage, userAlias, db)

        if (result === exitMessage) {
          console.log(`${userAlias} is not a ${this.ctx.config.bin} command.`)
        } else {
          userAlias = result
          delete db[userAlias]
          deleted = true
        }
      } else {
        delete db[userAlias]
        deleted = true
      }

      if (deleted) {
        console.log(`Successfully deleted alias ${userAlias}`)
      }

      return db
    } catch (err) {
      console.log(err)
      console.log('unable to load file')
    }
  }

  setupIncompleteWarning () {
    const AUTOCOMLETE_ALERT = `If you are running alias command for the first time, please run the following setup command to initiate the plugin setup: \n 
      '${chalk.bold('twilio alias:setup')}'`
    return console.warn(chalk.yellowBright(` » ${AUTOCOMLETE_ALERT}`))
  }

  pathExists (path) {
    return FileUtility.storage.pathExists(path)
  }

  importPathExists (path) {
    return FileUtility.storage.importPathExists(path)
  }

  createFolderIfDoesNotExists (folderPath, proceed) {
    try {
      if (!this.pathExists(folderPath)) {
        FileUtility.storage.makeDirectory(folderPath)
        proceed.move = true
      } else {
        console.log('Setup already complete')
        proceed.move = false
      }
    } catch (err) {
      console.log(err)
      proceed.move = false
    }
  }

  copyFileToDestination (sourcePath, destPath, mode) {
    try {
      FileUtility.storage.copyFile(sourcePath, destPath, mode)
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  removeDirectory (dir) {
    FileUtility.storage.removeDirectory(dir)
  }
}

FileUtility.storage = new FilesystemStorage()
FileUtility.prompt = new InquirerPrompts()
module.exports = FileUtility
