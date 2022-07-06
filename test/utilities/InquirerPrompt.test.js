const assert = require('chai').assert
const InquirerPrompts = require('../../src/utilities/InquirerPrompts')

describe('Tests for Inquirer Prompts', () => {
  const prompt = new InquirerPrompts()

  it('Check provide suggestions function', function () {
    assert.isArray(prompt.constructSuggestions('he', { hello: 'world', hello2: 'world2' }))
    assert.isTrue(prompt.constructSuggestions('he', { hello: 'world', hello2: 'world2' }).length === 2)
  })

  it('Check find suggestion function', function () {
    assert.notEqual(prompt.findSuggestions('error message', 'he', {}), 'hello', 'correct exit message when empty db')
  })
})
