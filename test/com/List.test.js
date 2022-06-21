const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Add = require('../../src/commands/alias/Add.js')
const Setup = require('../../src/commands/alias/Setup')
const List = require('../../src/commands/alias/List')
const FileUtil = require('../../src/utilities/FileUtility')
const SetupList = require('../../src/commands/alias/Setup')


describe('list-alias', () => {

    before(async function () {


        await SetupList.run();

        // runs before all tests in this file regardless where this line is defined.
        test
            .stdout()
            .command(['alias:Setup'])
            .it('allow setup', async ctx => {
                expect(await Setup.storage.load())
                expect(ctx.stdout).to.contain("complete");
            })


    });



    // test with passing data
    test
        .stdout()
        .stub(List, 'storage', new MemoryStorage({ "hello": "world", "alist": "alias:List" }))
        .command(['alias:List'])
        .it('should list the aliases', async ctx => {
            expect(await List.storage.load()).to.eql({
                "hello": "world",
                "alist": "alias:List"
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




