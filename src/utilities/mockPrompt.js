
class mockPrompts {
  constructor (data = '') {
    this.ans = data
  }

  async findSuggestions (exitMessage, userAlias, db) {
    return this.ans
  }

  constructSuggestions (userAlias, db) {

  }
}
module.exports = mockPrompts
