
const Trie = require('./TrieClass/Trie');
var distance = require('jaro-winkler');
const inquirer = require('inquirer');
const num_of_suggestions = 3

class InquirerPrompts {
    constructor() {
        
    }


    async findSuggestions(exit_message, userAlias, db) {
        const commandIDs = Object.keys(db)

        if (commandIDs.length === 0)
            return exit_message;


        const suggestions = this.constructSuggestions(userAlias, db);

        if (suggestions.length === 0) {
            return exit_message;
        }

        suggestions.push(exit_message);
        let result = exit_message;
        await inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'promptAnswer',
                    message: 'Did you mean?',
                    choices: suggestions,
                    default: exit_message
                },
            ])
            .then(answers => {
                result = answers.promptAnswer;

            });

        return result;
    }

    constructSuggestions(userAlias, db) {

        const commandIDs = Object.keys(db)

        commandIDs.sort(function distance_comparator(cmd1, cmd2) {

            const dist_cmd1 = distance(userAlias, cmd1);
            const dist_cmd2 = distance(userAlias, cmd2);
            if (dist_cmd1 > dist_cmd2)
                return -1;
            else if (dist_cmd1 < dist_cmd2)
                return 1;
            else
            {
                if (cmd1.length < cmd2.length)
                    return -1;
                else if (cmd1.length > cmd2.length)
                    return 1;
                else
                    return 0;
            }
        });


        const suggestions = commandIDs.slice(0, num_of_suggestions);

        return suggestions;
    }

}
module.exports = InquirerPrompts;