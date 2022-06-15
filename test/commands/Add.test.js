const { expect, test } = require('@oclif/test')
const MemoryStorage = require('./../../src/utilities/FileSnapshot/MemoryStorage.js')

const Add= require('../../src/commands/alias/Add')
const Delete = require('../../src/commands/alias/Delete')
const Export = require('../../src/commands/alias/Export')
const Import = require('../../src/commands/alias/Import')
const Use = require('../../src/commands/alias/Use')
const List = require('../../src/commands/alias/List')


/** Add an alias */
/**Step 1, add an alias
 * Step 2, add that alias again without flags
 * Step 3, add that alias again with flag
 */

 describe('add alias', () => {
    
    test
      .stdout()
      .stub(Add, 'storage', new MemoryStorage({}))
      .command(['alias:Add', 'hello', 'world'])
      .it('should add a new alias', async ctx => {
        expect(await Add.storage.load()).to.eql({
          
          aliases: {
            'hello': {
              command: 'world'
            },
          },
        })
        expect(ctx.stdout).to.contain('Created new project "project-one"')
      })
  
  
  
  
  
})