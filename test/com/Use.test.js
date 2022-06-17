const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Use = require('../../src/commands/alias/Use')
const List = require('../../src/commands/alias/List')



describe('use-alias', () => {

    // use an existing alias
  test
    .stdout()
    .stub(Use, 'storage', new MemoryStorage({"alist":"alias:List"}))
    .stub(List, 'storage', new MemoryStorage({"alist":"alias:List"}))
    .command(['alias:Use', 'alist'])
    .it('should use the alias to list aliases', async ctx => {
        expect(await Use.storage.load()).to.eql({
            "alist":"alias:List"
            })
        expect(ctx.stdout).to.contain("Alias\tCommand\nalist\talias:List");
    })

        // use an existing command using "use"
    test
    .stdout()
    .stub(Use, 'storage', new MemoryStorage({"alist":"alias:List"}))
    .stub(List, 'storage', new MemoryStorage({"alist":"alias:List"}))
    .command(['use', 'alist'])
    .it('should "use" the alias to list aliases', async ctx => {
        expect(await Use.storage.load()).to.eql({
            "alist":"alias:List"
            })
        expect(ctx.stdout).to.contain("Alias\tCommand\nalist\talias:List");
    })

  //use a non-existing alias
  test
    .stdout()
    .stub(Use, 'storage', new MemoryStorage({}))
    .stub(List, 'storage', new MemoryStorage({}))
    .command(['alias:Use', 'alist'])
    .it('should return command not found', async ctx => {
      expect(await Use.storage.load()).to.eql({
      })
      expect(ctx.stdout).to.contain('command alist is not found');
    })


  //use an alias without name
  test
    .stdout()
    .stub(Use, 'storage', new MemoryStorage({"alist":"alias:List"}))
    .stub(List, 'storage', new MemoryStorage({"alist":"alias:List"}))
    .command(['alias:Use'])
    .it('should give warning that alias name not provided', async ctx => {
      expect(await Use.storage.load()).to.eql({
        "alist":"alias:List"
      })
      expect(ctx.stdout).to.contain('Please insert an alias argument');
    })




})

