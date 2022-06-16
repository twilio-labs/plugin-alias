const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Import = require('../../src/commands/alias/Import')
const Export = require('../../src/commands/alias/Import')
const Setup = require('../../src/commands/alias/Setup')


/** Export/Import */
/**
 * Step 0, Launch Setup
 * Step 1, Export a file
 * Step 2, Export a file with extra params
 * Step 3, Import a file with correct path
 * Step 4, Import a file with incorrect path
 * Step 5, Import a file with empty/undefined parameters
 */


describe('export-import-tests', () => {



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



  //Extra parameter in Export'  test
  test
    .stdout()
    .stub(Export, 'storage', new MemoryStorage({}))
    .command(['alias:Export', 'ex'])
    .it('extra arguments passed for export', async ctx => {
      expect(await Export.storage.load()).to.eql({
      })
      expect(ctx.stdout).to.contain('invalid arguments provided');
    })




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


  //Invalid import file path
  test
    .stdout()
    .stub(Import, 'storage', new MemoryStorage({}))
    .command(['alias:Import', process.cwd() + '/' + 'dataexportss.json'])
    .it('file does not exists for import', async ctx => {
      expect(await Import.storage.load()).to.eql({

      })
      expect(ctx.stdout).to.contain('alias file does not exist at the specified path');
    })


  //Empty file path
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


