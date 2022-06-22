const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Add = require('../../src/commands/alias/Add.js')
const FileUtil = require('../../src/utilities/FileUtility')
// "posttest": "eslint --ignore-path .gitignore . && npm audit",

describe('Tests for adding alias', () => {

    describe('Before Setup', () => {

        describe('Adding an alias which does not exist to an empty list', () => {
            
            test
            .stdout()
            .stub(Add, 'storage', new MemoryStorage({}, false))
            .stub(FileUtil, 'storage', new MemoryStorage({}, false))
            .command(['alias:Add', 'hello', 'world'])
            .it('should throw the chalk error', async ctx => {
                expect(await Add.storage.load()).to.eql({
                })
            })
        })
       
    
        describe('Adding an alias without name', () => {
            
            test
            .stdout()
            .stub(Add, 'storage', new MemoryStorage({}, false))
            .stub(FileUtil, 'storage', new MemoryStorage({}, false))
            .command(['alias:Add'])
            .it('should show the error that name is not provided', async ctx => {
                expect(await Add.storage.load()).to.eql({
    
                })
                expect(ctx.stdout).to.contain('Please insert an alias argument')
            })
        })
    
        describe('Adding an alias without command', () => {
            test
            .stdout()
            .stub(Add, 'storage', new MemoryStorage({}, false))
            .stub(FileUtil, 'storage', new MemoryStorage({}, false))
            .command(['alias:Add', 'hello'])
            .it('should show the error that command is not provided', async ctx => {
                expect(await Add.storage.load()).to.eql({
    
                })
                expect(ctx.stdout).to.contain('Please insert the command to alias')
            })
        })

    })


    describe('After Setup', () => {

        describe('Adding an alias which does not exist to an empty list', () => {
            test
            .stdout()
            .stub(Add, 'storage', new MemoryStorage({} ))
            .stub(FileUtil, 'storage', new MemoryStorage({} ))
            .command(['alias:Add', 'hello', 'world'])
            .it('should add the alias empty', async ctx => {
                expect(await Add.storage.load()).to.eql({
                    hello: "world"
                })
            })
        })
    
        describe('Adding an alias which does not exist to a filled list', () => {
            test
            .stdout()
            .stub(Add, 'storage', new MemoryStorage({ aliasName: "aliasCommand" } ))
            .stub(FileUtil, 'storage', new MemoryStorage({aliasName: "aliasCommand"} ))
            .command(['alias:Add', 'hello', 'world'])
            .it('should add the alias', async ctx => {
                expect(await Add.storage.load()).to.eql({
                    aliasName: "aliasCommand",
                    hello: "world"
                })
            })
        })
    
        
        describe('Adding an alias which already exists without flag', () => {
            test
            .stdout()
            .stub(Add, 'storage', new MemoryStorage({ hello: "world" } ))
            .stub(FileUtil, 'storage', new MemoryStorage({hello: "world"} ))
            .command(['alias:Add', 'hello', 'world'])
            .it('should through warning that alias already exists', async ctx => {
                expect(await Add.storage.load()).to.eql({
                    hello: "world"
                })
                expect(ctx.stdout).to.contain('alias already exists for command "world". Consider adding -f for overwriting');
            })
        })
    
        describe('Adding an alias which already exists with flag', () => {
            test
            .stdout()
            .stub(Add, 'storage', new MemoryStorage({ hello: "name" } ))
            .stub(FileUtil, 'storage', new MemoryStorage({hello: "name"} ))
            .command(['alias:Add', 'hello', 'world', '-f'])
            .it('should add the alias forcefully', async ctx => {
                expect(await Add.storage.load()).to.eql({
                    hello: "world"
                })
            })
        })
    
        describe('Adding an alias without name', () => {
            test
            .stdout()
            .stub(Add, 'storage', new MemoryStorage({} ))
            .stub(FileUtil, 'storage', new MemoryStorage({} ))
            .command(['alias:Add'])
            .it('should show the error that name is not provided', async ctx => {
                expect(await Add.storage.load()).to.eql({
    
                })
                expect(ctx.stdout).to.contain('Please insert an alias argument')
            })
        })
    
        describe('Adding an alias without command', () => {
            test
            .stdout()
            .stub(Add, 'storage', new MemoryStorage({} ))
            .stub(FileUtil, 'storage', new MemoryStorage({} ))
            .command(['alias:Add', 'hello'])
            .it('should show the error that command is not provided', async ctx => {
                expect(await Add.storage.load()).to.eql({
    
                })
                expect(ctx.stdout).to.contain('Please insert the command to alias')
            })
        })

    })

    

});




