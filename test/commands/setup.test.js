const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Setup = require('../../src/commands/alias/Setup')




describe('setup test', () => {



  //Add an alias which does not exists
  test
    .stdout()
    .stub(Setup, 'storage', new MemoryStorage({}))
    .command(['alias:Setup'])
    .it('should setup', async ctx => {
      expect(await Setup.storage.load()).to.eql({
      })
      expect(ctx.stdout).to.contain('setup complete');
    })





})

