const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Delete = require('../../src/commands/alias/Delete.js')

describe('Delete alias tests', () => {

    // Delete an alias which already exists
    test
        .stdout()
        .stub(Delete, 'storage', new MemoryStorage({hello:"world"}))
        .command(['alias:Delete', 'hello'])
        .it('should delete the alias', async ctx => {
            expect(await Delete.storage.load()).to.eql({
              })
        })

    // Deleting an alias which does not exists
    test
    .stdout()
    .stub(Delete, 'storage', new MemoryStorage({}))
    .command(['alias:Delete', 'hello'])
    .it('should through warning that alias does not exist', async ctx => {
        expect(await Delete.storage.load()).to.eql({
          })
        expect(ctx.stdout).to.contain('alias does not exist');
    })

    // Deleting an alias without name
    test
    .stdout()
    .stub(Delete, 'storage', new MemoryStorage({}))
    .command(['alias:Delete'])
    .it('should show the error that name is not provided', async ctx => {
        expect(await Delete.storage.load()).to.eql({
            
          })
        expect(ctx.stdout).to.contain('Please insert an alias argument to delete')
    })

    // // Adding an alias without command
    // test
    // .stdout()
    // .stub(Add, 'storage', new MemoryStorage({}))
    // .command(['alias:Add', 'hello'])
    // .it('should show the error that command is not provided', async ctx => {
    //     expect(await Add.storage.load()).to.eql({
            
    //       })
    //     expect(ctx.stdout).to.contain('Please insert the command to alias')
    // })

});
