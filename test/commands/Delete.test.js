const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Delete = require('../../src/commands/alias/Delete.js')
const FileUtil = require('../../src/utilities/FileUtility')

describe('Tests for deleting alias', () => {

    describe('Before Setup', () => {

        describe('Deleting an alias which does not exists in an empty list', () => {
            test
            .stdout()
            .stub(Delete, 'storage', new MemoryStorage({}, false))
            .stub(FileUtil, 'storage', new MemoryStorage({}, false ))
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
            .stub(FileUtil, 'storage', new MemoryStorage({}, false ))
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
            .stub(FileUtil, 'storage', new MemoryStorage({hello: "world", hello2: "world2"} ))
            .command(['alias:Delete', 'hello'])
            .it('should delete the alias', async ctx => {
                expect(await Delete.storage.load()).to.eql({
                    hello2: "world2"
              })
            })
        })

        describe('Deleting an alias which does not exists in an empty list', () => {
            test
            .stdout()
            .stub(Delete, 'storage', new MemoryStorage({}))
            .stub(FileUtil, 'storage', new MemoryStorage({} ))
            .command(['alias:Delete', 'hello'])
            .it('should throw warning that alias does not exist', async ctx => {
                expect(await Delete.storage.load()).to.eql({
                    
                })
                expect(ctx.stdout).to.contain('alias does not exist');
            })
        })

        describe('Deleting an alias which does not exists in a filled list', () => {
            test
            .stdout()
            .stub(Delete, 'storage', new MemoryStorage({hello2: "world2"}))
            .stub(FileUtil, 'storage', new MemoryStorage({} ))
            .command(['alias:Delete', 'hello'])
            .it('should throw warning that alias does not exist', async ctx => {
                expect(await Delete.storage.load()).to.eql({
                    hello2: "world2"
                })
                expect(ctx.stdout).to.contain('alias does not exist');
            })
        })


        describe('Deleting an alias without name', () => {
            test
            .stdout()
            .stub(Delete, 'storage', new MemoryStorage({}))
            .stub(FileUtil, 'storage', new MemoryStorage({} ))
            .command(['alias:Delete'])
            .it('should show the error that name is not provided', async ctx => {
                expect(await Delete.storage.load()).to.eql({
                    
                })
                expect(ctx.stdout).to.contain('Please insert an alias argument to delete');
            })
        })

    })

})