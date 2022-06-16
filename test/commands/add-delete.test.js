const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Add = require('../../src/commands/alias/Add')
const Setup = require('../../src/commands/alias/Setup')
const Delete = require('../../src/commands/alias/Delete')



/** Add/Delete */
/**
 * Step 0, Launch Setup
 * Step 1, add an alias
 * Step 2, add that alias again without flags
 * Step 3, add that alias again with flag
 * Step 4, delete that alias
 * Step 5, delete that alias again (should give error)
 */


describe('add-alias', () => {

  //console.log('p1');

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

  //console.log('p2');

  //Add an alias which does not exists
  test
    .stdout()
    .stub(Add, 'storage', new MemoryStorage({}))
    .command(['alias:Add', 'hello', 'world'])
    .it('should add a new alias', async ctx => {
      expect(await Add.storage.load()).to.eql({
      })
    })


  //Add that alias again, to give a warning
  test
    .stdout()
    .stub(Add, 'storage', new MemoryStorage({}))
    .command(['alias:Add', 'hello', 'world'])
    .it('should give a warning of same alias', async ctx => {
      expect(await Add.storage.load()).to.eql({

      })
      expect(ctx.stdout).to.contain('alias already exists for command "world". Consider adding -f for overwriting')
    })

  //console.log('p4');

  //Add an alias with flags
  test
    .stdout()
    .stub(Add, 'storage', new MemoryStorage({}))
    .command(['alias:Add', 'hello', 'life', '-f'])
    .it('should add a new alias with flag overwrite', async ctx => {
      expect(await Add.storage.load()).to.eql({
      })
    })


  test
    .stdout()
    .stub(Delete, 'storage', new MemoryStorage({}))
    .command(['alias:Delete', 'hello'])
    .it('should delete an existing alias', async ctx => {
      expect(await Delete.storage.load()).to.eql({
      })

    })


  test
    .stdout()
    .stub(Delete, 'storage', new MemoryStorage({}))
    .command(['alias:Delete', 'hello'])
    .it('should delete a non-existing alias', async ctx => {
      expect(await Delete.storage.load()).to.eql({
      })
      expect(ctx.stdout).to.contain('alias does not exist');
    })



})

