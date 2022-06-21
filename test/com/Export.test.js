const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Add = require('../../src/commands/alias/Add.js')
const SetupExport = require('../../src/commands/alias/Setup')
const Setup = require('../../src/commands/alias/Setup')
const Import = require('../../src/commands/alias/Import')
const Export = require('../../src/commands/alias/Export')


describe('export-alias', () => {

    before(async function () {

        await SetupExport.run();

        // runs before all tests in this file regardless where this line is defined.
        test
            .stdout()
            .command(['alias:Setup'])
            .it('allow setup', async ctx => {
                expect(await Setup.storage.load())
                expect(ctx.stdout).to.contain("complete");
            })


    });


    //export empty file
    test
        .stdout()
        .stub(Export, 'storage', new MemoryStorage({}))
        .command(['alias:Export'])
        .it('export alias data file (empty)', async ctx => {
            expect(await Export.storage.load())
            expect(ctx.stdout).to.include('export completed');
        })



    //export file with data
    test
        .stdout()
        .stub(Export, 'storage', new MemoryStorage({ hello: "world", hello1: "world2" }))
        .command(['alias:Export'])
        .it('export alias data file', async ctx => {
            expect(await Export.storage.load())
            expect(ctx.stdout).to.contain('export completed');
        })


    //Extra args for export
    test
        .stdout()
        .stub(Export, 'storage', new MemoryStorage({}))
        .command(['alias:Export'])
        .it('extra arguments passed for export', async ctx => {
            expect(await Export.storage.load());
        })




});




