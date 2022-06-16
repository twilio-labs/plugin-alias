const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Use = require('../../src/commands/alias/Use')




describe('use-alias', () => {



  //use an existing alias
  test
    .stdout()
    .stub(Use, 'storage', new MemoryStorage({}))
    .command(['alias:Use', 'alist'])
    .it('should equal to use case', async ctx => {
      expect(await Use.storage.load()).to.eql({
      })

    })

  //use a non-existing alias
  test
    .stdout()
    .stub(Use, 'storage', new MemoryStorage({}))
    .command(['alias:Use', 'hello'])
    .it('should return command not found', async ctx => {
      expect(await Use.storage.load()).to.eql({
      })
      expect(ctx.stdout).to.contain('command hello is not found');
    })




})

