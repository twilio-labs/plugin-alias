const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Use = require('../../src/commands/alias/Use')
const SetupUse = require('../../src/commands/alias/Setup')
const List = require('../../src/commands/alias/List')


describe('use-alias', () => {


  before(async function () {


    await SetupUse.run();

    // runs before all tests in this file regardless where this line is defined.
    test
      .stdout()
      .command(['alias:Setup'])
      .it('allow setup', async ctx => {
        expect(await Setup.storage.load())
        expect(ctx.stdout).to.contain("complete");
      })


  });


  // use an existing alias [alias:Use]
  test
    .stdout()
    .stub(Use, 'storage', new MemoryStorage({ "alist": "alias:List" }))
    .stub(List, 'storage', new MemoryStorage({ "alist": "alias:List" }))
    .command(['alias:Use', 'alist'])
    .it('should use the alias to list aliases', async ctx => {
      expect(await Use.storage.load())
      expect(ctx.stdout).to.contain("Alias\tCommand\nalist\talias:List");
    })




  // use an existing alias [use]
  test
    .stdout()
    .stub(Use, 'storage', new MemoryStorage({ "alist": "alias:List" }))
    .stub(List, 'storage', new MemoryStorage({ "alist": "alias:List" }))
    .command(['use', 'alist'])
    .it('should use "use" to list aliases', async ctx => {
      expect(await Use.storage.load())
      expect(ctx.stdout).to.contain("Alias\tCommand\nalist\talias:List");
    })



  //use command on empty data.json file
  test
    .stdout()
    .stub(Use, 'storage', new MemoryStorage({}))
    .stub(List, 'storage', new MemoryStorage({}))
    .command(['alias:Use', 'alist'])
    .it('should return command not found', async ctx => {
      expect(await Use.storage.load())
      expect(ctx.stdout).to.contain('command alist is not found');
    })




  //use a non-existing alias
  test
    .stdout()
    .stub(Use, 'storage', new MemoryStorage({ "hello": "world" }))
    .stub(List, 'storage', new MemoryStorage({ "hello": "world" }))
    .command(['alias:Use', 'alist'])
    .it('should return command not found', async ctx => {
      expect(await Use.storage.load())
      expect(ctx.stdout).to.contain('command alist is not found');
    })



  //use an alias without name
  test
    .stdout()
    .stub(Use, 'storage', new MemoryStorage({ "alist": "alias:List" }))
    .stub(List, 'storage', new MemoryStorage({ "alist": "alias:List" }))
    .command(['alias:Use'])
    .it('should give warning that alias name not provided', async ctx => {
      expect(await Use.storage.load())
      expect(ctx.stdout).to.contain('Please insert an alias argument');
    })



  //use 'use' keyword without name
  test
    .stdout()
    .stub(Use, 'storage', new MemoryStorage({ "alist": "alias:List" }))
    .stub(List, 'storage', new MemoryStorage({ "alist": "alias:List" }))
    .command(['use'])
    .it('should give warning that alias name not provided (use)', async ctx => {
      expect(await Use.storage.load()).to.eql({
        "alist": "alias:List"
      })
      expect(ctx.stdout).to.contain('Please insert an alias argument');


    })




})

