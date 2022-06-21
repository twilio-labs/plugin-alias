const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Add = require('../../src/commands/alias/Add.js')
const Setup = require('../../src/commands/alias/Setup')
const SetupUtil = require('../../src/commands/alias/Setup')
const Reset = require('../../src/commands/alias/Reset')
const SetupAdd = require('../../src/commands/alias/Setup')


describe('set-reset-alias', () => {

    before(async function () {


        await Reset.run();
        await Setup.run();


    });




    // runs before all tests in this file regardless where this line is defined.
    test
        .stdout()
        .command(['alias:Setup'])
        .it('allow setup', async ctx => {
            expect(await Setup.storage.load())
            expect(ctx.stdout).to.contain("complete");
        })




});




