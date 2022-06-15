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




 describe('export-tests', () => {
  

    
    //Export aliases from dataDir of CLI to current dir
    test
      .stdout()
      .stub(Export, 'storage', new MemoryStorage({}))
      .command(['alias:Export'])
      .it('export alias data file', async ctx => {
        expect(await Export.storage.load()).to.eql({
        })
        expect(ctx.stdout).to.contain(process.cwd() + '/' + 'dataexport.json');
      })
      
    
  
    

})


