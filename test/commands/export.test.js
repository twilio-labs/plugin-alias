const { expect, test } = require('@oclif/test')
const MemoryStorage = require('./../../src/utilities/FileSnapshot/MemoryStorage.js')
const Export = require('../../src/commands/alias/Export')





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


