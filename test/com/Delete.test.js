const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Delete = require('../../src/commands/alias/Delete.js')
let SetupDelete = require('../../src/commands/alias/Setup')

describe('delete-alias', () => {

    before(async function () {


        await SetupDelete.run();

        // runs before all tests in this file regardless where this line is defined.
        test
            .stdout()
            .command(['alias:Setup'])
            .it('allow setup', async ctx => {
                expect(await Setup.storage.load())
                expect(ctx.stdout).to.contain("complete");
            })


    });

    // Delete an alias which already exists
    test
        .stdout()
        .stub(Delete, 'storage', new MemoryStorage({ hello: "world", hello2: "world2" }))
        .command(['alias:Delete', 'hello'])
        .it('should delete the alias', async ctx => {
            expect(await Delete.storage.load())
        })


    // Deleting an alias which does not exists in an empty list
    test
        .stdout()
        .stub(Delete, 'storage', new MemoryStorage({}))
        .command(['alias:Delete', 'hello'])
        .it('should throw warning that alias does not exist (empty)', async ctx => {
            expect(await Delete.storage.load())
            expect(ctx.stdout).to.contain('alias does not exist');
        })



    // Deleting an alias which does not exists in a filled list
    test
        .stdout()
        .stub(Delete, 'storage', new MemoryStorage({ hello2: "world2" }))
        .command(['alias:Delete', 'hello'])
        .it('should throw warning that alias does not exist', async ctx => {
            expect(await Delete.storage.load())
            expect(ctx.stdout).to.contain('alias does not exist');
        })




    // Deleting an alias without name
    test
        .stdout()
        .stub(Delete, 'storage', new MemoryStorage({}))
        .command(['alias:Delete'])
        .it('should show the error that name is not provided', async ctx => {
            expect(await Delete.storage.load())
            expect(ctx.stdout).to.contain('Please insert an alias argument to delete')
        })


});
