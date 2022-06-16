const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Add = require('../../src/commands/alias/Add')



/** Add an alias */
/**Step 1, add an alias
 * Step 2, add that alias again without flags
 * Step 3, add that alias again with flag
 */

describe('add-alias', () => {



  //Add an alias which does not exists
  test
    .stdout()
    .stub(Add, 'storage', new MemoryStorage({}))
    .command(['alias:Add', 'hello', 'world', '-f'])
    .it('should add a new alias', async ctx => {
      expect(await Add.storage.load()).to.eql({
      })
    })



  //Add that alias again, to give a warning
  // test
  //   .stdout()
  //   .stub(Add, 'storage', new MemoryStorage({}))
  //   .command(['alias:Add', 'hello', 'world'])
  //   .it('should give a warning of same alias', async ctx => {
  //     expect(await Add.storage.load()).to.eql({

  //     })
  //     expect(ctx.stdout).to.contain('alias already exists for command "world". Consider adding -f for overwriting')
  //   })





})

