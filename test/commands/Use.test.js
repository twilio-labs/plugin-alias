const { expect, test } = require('@oclif/test')
const MemoryStorage = require('./../../src/utilities/FileSnapshot/MemoryStorage.js')
const AliasObject = require('../../src/utilities/AliasObject')
const FileUtil = require('../../src/utilities/FileUtility')
const lsTest = require('./List.test');

const Add= require('../../src/commands/alias/Add')
const Delete = require('../../src/commands/alias/Delete')
const Export = require('../../src/commands/alias/Export')
const Import = require('../../src/commands/alias/Import')
const Use = require('../../src/commands/alias/Use')
const List = require('../../src/commands/alias/List')




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

