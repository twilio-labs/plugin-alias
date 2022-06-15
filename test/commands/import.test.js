const { expect, test } = require('@oclif/test')
const MemoryStorage = require('./../../src/utilities/FileSnapshot/MemoryStorage.js')
const AliasObject = require('../../src/utilities/AliasObject')
const FileUtil = require('../../src/utilities/FileUtility')

const Export = require('../../src/commands/alias/Export')
const Import = require('../../src/commands/alias/Import')




 describe('import-tests', () => {
  

    
    
    
    //import aliases from arg to dataDir of CLI 
    test
      .stdout()
      .stub(Import, 'storage', new MemoryStorage({}))
      .command(['alias:Import', process.cwd() + '/' + 'dataexport.json'])
      .it('import alias data file', async ctx => {
        expect(await Import.storage.load()).to.eql({
            
        })
        expect(ctx.stdout).to.contain('import completed');
      })

      test
      .stdout()
      .stub(Import, 'storage', new MemoryStorage({}))
      .command(['alias:Import', process.cwd() + '/' + 'dataexportss.json'])
      .it('file does not exists for import', async ctx => {
        expect(await Import.storage.load()).to.eql({
            
        })
        expect(ctx.stdout).to.contain('alias file does not exist at the specified path');
      })


      test
      .stdout()
      .stub(Import, 'storage', new MemoryStorage({}))
      .command(['alias:Import'])
      .it('argument not passed for import', async ctx => {
        expect(await Import.storage.load()).to.eql({
            
        })
        expect(ctx.stdout).to.contain('please add the path of the alias.json file');
      })


      
      
      
    

})


