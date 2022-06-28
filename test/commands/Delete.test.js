const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const InquirerPrompts = require('../../src/utilities/InquirerPrompts')
const Delete = require('../../src/commands/alias/Delete.js')
const FileUtil = require('../../src/utilities/FileUtility')
const inquirer = require('inquirer');
const ContextUtil = require('../../src/utilities/ContextUtility')
const FilesystemStorage = require('../../src/utilities/FileSnapshot/FilesystemStorage')
const fs = require('fs');
const assert = require('chai').assert;


describe('Tests for deleting alias', () => {

    describe('Before Setup', () => {

        describe('Deleting an alias which does not exists in an empty list', () => {
            test
                .stdout()
                .stub(Delete, 'storage', new MemoryStorage({}, false))
                .stub(FileUtil, 'storage', new MemoryStorage({}, false))
                .command(['alias:Delete', 'hello'])
                .it('should throw the chalk error', async ctx => {
                    expect(await Delete.storage.load()).to.eql({

                    })
                })
        })


        describe('Deleting an alias without name', () => {
            test
                .stdout()
                .stub(Delete, 'storage', new MemoryStorage({}, false))
                .stub(FileUtil, 'storage', new MemoryStorage({}, false))
                .command(['alias:Delete'])
                .it('should show the error that name is not provided', async ctx => {
                    expect(await Delete.storage.load()).to.eql({

                    })
                    expect(ctx.stdout).to.contain('Please insert an alias argument to delete');
                })
        })

    })


    describe('After Setup', () => {

        describe('Deleting an alias which already exists', () => {
            test
                .stdout()
                .stub(Delete, 'storage', new MemoryStorage({ hello: "world", hello2: "world2" }))
                .stub(FileUtil, 'storage', new MemoryStorage({ hello: "world", hello2: "world2" }))
                .command(['alias:Delete', 'hello'])
                .it('should delete the alias', async ctx => {
                    expect(await Delete.storage.load()).to.eql({
                        hello2: "world2"
                    })
                })
        })



        // describe('Deleting an alias which does not exist', () => {
        //     test

        //         .stub(Delete, 'storage', new MemoryStorage({ hello: "world", hello2: "world2", ello: "wo" }))
        //         .stub(FileUtil, 'storage', new MemoryStorage({ hello: "world", hello2: "world2", ello: "wo" }))
        //         .stdout()
        //         .stderr()
        //         .stub(inquirer, 'prompt', () => hello)
        //         .command(['alias:Delete', 'hel'])
        //         .it('should delete the alias', async ctx => {
        //             expect(await Delete.storage.load()).to.eql({
        //                 hello2: "world2",
        //                 ello: "wo"
        //             })
        //         })
        // })






        describe('Deleting an alias without name', () => {
            test
                .stdout()
                .stub(Delete, 'storage', new MemoryStorage({}))
                .stub(FileUtil, 'storage', new MemoryStorage({}))
                .command(['alias:Delete'])
                .it('should show the error that name is not provided', async ctx => {
                    expect(await Delete.storage.load()).to.eql({

                    })
                    expect(ctx.stdout).to.contain('Please insert an alias argument to delete');
                })
        })

    })

})