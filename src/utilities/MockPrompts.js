
class MockPrompts {
  constructor (data) {
    this.ans = data
  }

  async findSuggestions (_exitMessage, _userAlias, _db) {
    return this.ans
  }

  constructSuggestions (_userAlias, _db) {

  }
}
module.exports = MockPrompts
