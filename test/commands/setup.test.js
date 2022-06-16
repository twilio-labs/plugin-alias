const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Setup = require('../../src/commands/alias/Setup')
const Reset = require('../../src/commands/alias/Reset')


/** Setup */
/**
 * Step 0, reset command
 * 
 */


describe('setup test', () => {

  //Reset everything
  test
    .stdout()
    .stub(Reset, 'storage', new MemoryStorage({}))
    .command(['alias:Reset'])
    .it('should reset directory', async ctx => {
      expect(await Setup.storage.load()).to.eql({
      })
      expect(ctx.stdout).to.contain('reset complete');
    })




  //Initiate setup
  test
    .stdout()
    .stub(Setup, 'storage', new MemoryStorage({}))
    .command(['alias:Setup'])
    .it('should setup', async ctx => {
      expect(await Setup.storage.load()).to.eql({
      })
      expect(ctx.stdout).to.contain('setup complete');
    })


  //Setup
  test
    .stdout()
    .stub(Setup, 'storage', new MemoryStorage({}))
    .command(['alias:Setup'])
    .it('should init setup', async ctx => {
      expect(await Setup.storage.load()).to.eql({
      })
      expect(ctx.stdout).to.contain('setup already complete');
    })




})

