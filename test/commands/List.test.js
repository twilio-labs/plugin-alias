const { expect, test } = require('@oclif/test')
const MemoryStorage = require('./../../src/utilities/FileSnapshot/MemoryStorage.js')
const AliasObject = require('../../src/utilities/AliasObject')
const FileUtil = require('../../src/utilities/FileUtility')


const Add= require('../../src/commands/alias/Add')
const Delete = require('../../src/commands/alias/Delete')
const Export = require('../../src/commands/alias/Export')
const Import = require('../../src/commands/alias/Import')
const Use = require('../../src/commands/alias/Use')
const List = require('../../src/commands/alias/List')




describe('list-aliases', function listAlias(userAlias, userCommand, contain) {
  
     
      test
      .stdout()
      .stub(List, 'storage', new MemoryStorage({}))
      .command(['alias:List'])
      .it('should test json file', async ctx => {
        
        const db = await List.storage.load();
        
        if(contain){
            expect(db[userAlias]).to.eql(userCommand);
        }
        else{
            expect(db[userAlias]).to.eql(undefined);
        }

      })
    
  
  });
  