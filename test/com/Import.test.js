const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Add = require('../../src/commands/alias/Add.js')
const Setup = require('../../src/commands/alias/Setup')
const SetupImport = require('../../src/commands/alias/Setup')
const Import = require('../../src/commands/alias/Import')
const Export = require('../../src/commands/alias/Export')


describe('import-alias', () => {

    before(async function () {

        await SetupImport.run();
        // runs before all tests in this file regardless where this line is defined.

        await Export.run();



    });


    //import empty file
    test
        .stdout()
        .stub(Import, 'storage', new MemoryStorage({}))
        .command(['alias:Import', process.cwd() + '/' + 'dataexport.json'])
        .it('import alias data file (empty)', async ctx => {
            expect(await Import.storage.load())
//             expect(ctx.stdout).to.contain('import completed');
        })



    //import file with data
    test
        .stdout()
        .stub(Import, 'storage', new MemoryStorage({ hello: "world", hello1: "world2" }))
        .command(['alias:Import', process.cwd() + '/' + 'dataexport.json'])
        .it('import alias data file', async ctx => {
            expect(await Import.storage.load())
//             expect(ctx.stdout).to.contain('import completed');
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




});



