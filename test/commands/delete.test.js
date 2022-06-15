const { expect, test } = require('@oclif/test')
const MemoryStorage = require('./../../src/utilities/FileSnapshot/MemoryStorage.js')
const AliasObject = require('../../src/utilities/AliasObject')
const FileUtil = require('../../src/utilities/FileUtility')
const Delete = require('../../src/commands/alias/Delete')

describe('delete-non-existing-alias', () => {


  //Add an alias which does not exists
  test
    .stdout()
    .stub(Delete, 'storage', new MemoryStorage({}))
    .command(['alias:Delete', 'notfound'])
    .it('should delete a non-existing alias', async ctx => {
      expect(await Delete.storage.load()).to.eql({
      })
      expect(ctx.stdout).to.contain('alias does not exist');
    })


})








