const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const List = require('../../src/commands/alias/List.js')




describe('list-aliases', () => {

        // test with passing data
        test
        .stdout()
        .stub(List, 'storage', new MemoryStorage({"hello":"world", "alist":"alias:List"}))
        .command(['alias:List'])
        .it('should list the aliases', async ctx => {
            expect(await List.storage.load()).to.eql({
                "hello":"world", 
                "alist":"alias:List"
              })
            expect(ctx.stdout).to.contain("Alias\tCommand\nhello\tworld\nalist\talias:List");
        })

        // test without passing data
        test
        .stdout()
        .stub(List, 'storage', new MemoryStorage())
        .command(['alias:List'])
        .it('should list the aliases', async ctx => {
            expect(await List.storage.load()).to.eql({
                
              })
            expect(ctx.stdout).to.contain("Alias\tCommand");
        })



});
