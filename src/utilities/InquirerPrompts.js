const distance = require('jaro-winkler')
const inquirer = require('inquirer')
const numOfSuggestions = 3

class InquirerPrompts {
  async findSuggestions (exitMessage, userAlias, db) {
    const commandIDs = Object.keys(db)

    if (commandIDs.length === 0) { return exitMessage }

    const suggestions = this.constructSuggestions(userAlias, db)

    if (suggestions.length === 0) {
      return exitMessage
    }

    suggestions.push(exitMessage)
    let result = exitMessage
    await inquirer
      .prompt([
        {
          type: 'list',
          name: 'promptAnswer',
          message: 'Did you mean?',
          choices: suggestions,
          default: exitMessage
        }
      ])
      .then(answers => {
        result = answers.promptAnswer
      })

    return result
  }

  constructSuggestions (userAlias, db) {
    const commandIDs = Object.keys(db)

    commandIDs.sort(function distanceComparator (cmd1, cmd2) {
      const distCmd1 = distance(userAlias, cmd1)
      const distCmd2 = distance(userAlias, cmd2)
      if (distCmd1 > distCmd2) { return -1 } else if (distCmd1 < distCmd2) { return 1 } else {
        if (cmd1.length < cmd2.length) { return -1 } else if (cmd1.length > cmd2.length) { return 1 } else { return 0 }
      }
    })

    return commandIDs.slice(0, numOfSuggestions)
  }
}
module.exports = InquirerPrompts
