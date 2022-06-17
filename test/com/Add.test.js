const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Add = require('../../src/commands/alias/Add.js')
const chalk = require('chalk');


describe('Add alias tests', () => {

    // Adding an alias which does not exist
    test
        .stdout()
        .stub(Add, 'storage', new MemoryStorage({}))
        .command(['alias:Add', 'hello', 'world'])
        .it('should add the alias', async ctx => {
            expect(await Add.storage.load()).to.eql({
                hello: "world"
              })
        })
        
    // Adding an alias which already exists without flag
    test
    .stdout()
    .stub(Add, 'storage', new MemoryStorage({hello:"world"}))
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
    .stub(Add, 'storage', new MemoryStorage({hello:"name"}))
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

});
