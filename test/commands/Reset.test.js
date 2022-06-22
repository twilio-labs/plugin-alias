const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Reset = require('../../src/commands/alias/Setup.js')
const FileUtil = require('../../src/utilities/FileUtility')


describe('Tests for reset', () => {

    describe('Reset when alias folder does not exists', () => {

        test
        .stdout()
        .stub(Reset, 'storage', new MemoryStorage({}, false))
        .stub(FileUtil, 'storage', new MemoryStorage({}, false))
        .command(['alias:Reset'])
        .it('should print reset complete', async ctx => {
            expect(await Reset.storage.load()).to.eql({
            })
            expect(ctx.stdout).to.contain('reset complete');
        })
    })

    describe('Reset when alias folder already exists', () => {

        test
        .stdout()
        .stub(Reset, 'storage', new MemoryStorage({}, true))
        .stub(FileUtil, 'storage', new MemoryStorage({}, true))
        .command(['alias:Reset'])
        .it('should print reset complete', async ctx => {
            expect(await Reset.storage.load()).to.eql({
            })
            expect(ctx.stdout).to.contain('reset complete');
        })
    })


    describe('Reset with extra arguments', () => {

        test
        .stdout()
        .stub(Reset, 'storage', new MemoryStorage({}, true))
        .stub(FileUtil, 'storage', new MemoryStorage({}, true))
        .command(['alias:Reset', 'alist'])
        .it('should throw error that extra arguments provided', async ctx => {
            expect(await Reset.storage.load()).to.eql({
            })
            expect(ctx.stdout).to.contain("Invalid argument 'alist' provided");
        })
    })

});




