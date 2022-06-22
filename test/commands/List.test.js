const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const List = require('../../src/commands/alias/List')
const FileUtil = require('../../src/utilities/FileUtility')

describe('Tests for listing alias', () => {

    describe('Before Setup', () => {

        describe('Listing an empty list', () => {
            test
            .stdout()
            .stub(List, 'storage', new MemoryStorage({  }, false))
            .stub(FileUtil, 'storage', new MemoryStorage({  }, false ))
            .command(['alias:List'])
            .it('should throw the chalk error', async ctx => {
                expect(await List.storage.load()).to.eql({
                    
                })
            })
        })

        describe('Listing with extra arguments', () => {
            test
            .stdout()
            .stub(List, 'storage', new MemoryStorage({  }, false))
            .stub(FileUtil, 'storage', new MemoryStorage({  }, false ))
            .command(['alias:List', 'hello'])
            .it('should throw warning for extra argument', async ctx => {
                expect(await List.storage.load()).to.eql({
                })
                expect(ctx.stdout).to.contain("Invalid argument 'hello' provided");
            })
        })

    })


    describe('After Setup', () => {

        describe('Listing a filled list', () => {
            test
            .stdout()
            .stub(List, 'storage', new MemoryStorage({ hello: "world", alist: "alias:List" }))
            .stub(FileUtil, 'storage', new MemoryStorage({ hello: "world", alist: "alias:List" } ))
            .command(['alias:List'])
            .it('should list the filled aliases list', async ctx => {
                expect(await List.storage.load()).to.eql({
                    hello: "world",
                    alist: "alias:List"
                })
                expect(ctx.stdout).to.contain("Alias\tCommand\nhello\tworld\nalist\talias:List");
            })
        })

        describe('Listing an empty list', () => {
            test
            .stdout()
            .stub(List, 'storage', new MemoryStorage({  }))
            .stub(FileUtil, 'storage', new MemoryStorage({  } ))
            .command(['alias:List'])
            .it('should list the empty aliases list', async ctx => {
                expect(await List.storage.load()).to.eql({
                    
                })
                expect(ctx.stdout).to.contain("Alias\tCommand");
            })
        })

        describe('Listing with extra arguments', () => {
            test
            .stdout()
            .stub(List, 'storage', new MemoryStorage({ hello: "world", alist: "alias:List" }))
            .stub(FileUtil, 'storage', new MemoryStorage({ hello: "world", alist: "alias:List" } ))
            .command(['alias:List', 'hello'])
            .it('should throw warning for extra argument', async ctx => {
                expect(await List.storage.load()).to.eql({
                    hello: "world",
                    alist: "alias:List"
                })
                expect(ctx.stdout).to.contain("Invalid argument 'hello' provided");
            })
        })

    })

})