const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Add = require('../../src/commands/alias/Add.js')
const Setup = require('../../src/commands/alias/Setup')
const List = require('../../src/commands/alias/List')
const FileUtil = require('../../src/utilities/FileUtility')
const SetupAdd = require('../../src/commands/alias/Setup')


describe('add-alias', () => {

    before(async function () {


        await SetupAdd.run();

        // runs before all tests in this file regardless where this line is defined.
        test
            .stdout()
            .command(['alias:Setup'])
            .it('allow setup', async ctx => {
                expect(await Setup.storage.load())
                expect(ctx.stdout).to.contain("complete");
            })


    });



    // Adding an alias which does not exist to an empty list
    test
        .stdout()
        .stub(Add, 'storage', new MemoryStorage({}))
        .command(['alias:Add', 'hello', 'world'])
        .it('should add the alias empty', async ctx => {
            expect(await Add.storage.load()).to.eql({
                hello: "world"
            })
        })


    // Adding an alias which does not exist to a filled list
    test
        .stdout()
        .stub(Add, 'storage', new MemoryStorage({ aliasName: "aliasCommand" }))
        .command(['alias:Add', 'hello', 'world'])
        .it('should add the alias', async ctx => {
            expect(await Add.storage.load())
        })

    // Adding an alias which already exists without flag
    test
        .stdout()
        .stub(Add, 'storage', new MemoryStorage({ hello: "world" }))
        .command(['alias:Add', 'hello', 'world'])
        .it('should through warning that alias already exists', async ctx => {
            expect(await Add.storage.load()).to.eql({
                hello: "world"
            })
            expect(ctx.stdout).to.contain('alias already exists for command "world". Consider adding -f for overwriting');
        })

    // Adding an alias which already exists with flag
    test
        .stdout()
        .stub(Add, 'storage', new MemoryStorage({ hello: "name" }))
        .command(['alias:Add', 'hello', 'world', '-f'])
        .it('should add the alias forcefully', async ctx => {
            expect(await Add.storage.load()).to.eql({
                hello: "world"
            })
        })

    // Adding an alias without name
    test
        .stdout()
        .stub(Add, 'storage', new MemoryStorage({}))
        .command(['alias:Add'])
        .it('should show the error that name is not provided', async ctx => {
            expect(await Add.storage.load()).to.eql({

            })
            expect(ctx.stdout).to.contain('Please insert an alias argument')
        })




    // Adding an alias without command
    test
        .stdout()
        .stub(Add, 'storage', new MemoryStorage({}))
        .command(['alias:Add', 'hello'])
        .it('should show the error that command is not provided', async ctx => {
            expect(await Add.storage.load()).to.eql({

            })
            expect(ctx.stdout).to.contain('Please insert the command to alias')
        })


    //Add tests for invalid flags





});




