
const Trie = require('./TrieClass/Trie');
var distance = require('jaro-winkler');
const inquirer = require('inquirer');
const num_of_suggestions = 3

class mockPrompts {
    constructor(data = "") {
        this.ans = data;
    }


    async findSuggestions(exit_message, userAlias, db) {
        return this.ans;
    }

    constructSuggestions(userAlias, db) {

    }

}
module.exports = mockPrompts;