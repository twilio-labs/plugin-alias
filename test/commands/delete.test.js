const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Delete = require('../../src/commands/alias/delete.js')
const FileUtil = require('../../src/utilities/FileUtility')
const MockPrompts = require('../../src/utilities/MockPrompts')

describe('Tests for deleting alias', () => {
  describe('Before Setup', () => {
    describe('Deleting an alias which does not exists in an empty list', () => {
      test
        .stdout()
        .stub(Delete, 'storage', new MemoryStorage({}, false))
        .stub(FileUtil, 'storage', new MemoryStorage({}, false))
        .command(['alias:delete', 'hello'])
        .it('should throw the chalk error', async _ctx => {
          expect(await Delete.storage.load()).to.eql({

          })
        })
    })

    describe('Deleting an alias without name', () => {
      test
        .stdout()
        .stub(Delete, 'storage', new MemoryStorage({}, false))
        .stub(FileUtil, 'storage', new MemoryStorage({}, false))
        .command(['alias:delete'])
        .it('should show the error that name is not provided', async ctx => {
          expect(await Delete.storage.load()).to.eql({

          })
          expect(ctx.stdout).to.contain('Please insert an alias argument to delete')
        })
    })
  })

  describe('After Setup', () => {
    describe('Deleting an alias which already exists', () => {
      test
        .stdout()
        .stub(Delete, 'storage', new MemoryStorage({ hello: 'world', hello2: 'world2' }))
        .stub(FileUtil, 'storage', new MemoryStorage({ hello: 'world', hello2: 'world2' }))
        .command(['alias:delete', 'hello'])
        .it('should delete the alias', async ctx => {
          expect(await Delete.storage.load()).to.eql({
            hello2: 'world2'
          })
          expect(ctx.stdout).to.contain('Successfully deleted alias hello')
        })
    })

    describe("Deleting an alias which doesn't exists", () => {
      describe('Suggestions not accepted', () => {
        test
          .stdout()
          .stub(FileUtil, 'prompt', new MockPrompts('Continue without deleting'))
          .stub(Delete, 'storage', new MemoryStorage({ hello: 'world', hello2: 'world2' }))
          .stub(FileUtil, 'storage', new MemoryStorage({ hello: 'world', hello2: 'world2' }))
          .command(['alias:delete', 'he'])
          .it('should show the suggestions but not accepted', async ctx => {
            expect(await Delete.storage.load()).to.eql({
              hello: 'world',
              hello2: 'world2'
            })
            expect(ctx.stdout).to.contain('he is not a twilio command.')
          })
      })

      describe('Suggestion accepted', () => {
        test
          .stdout()
          .stub(FileUtil, 'prompt', new MockPrompts('hello'))
          .stub(Delete, 'storage', new MemoryStorage({ hello: 'world', hello2: 'world2' }))
          .stub(FileUtil, 'storage', new MemoryStorage({ hello: 'world', hello2: 'world2' }))
          .command(['alias:delete', 'he'])
          .it('should show the suggestions but accepted', async ctx => {
            expect(await Delete.storage.load()).to.eql({
              hello2: 'world2'
            })
            expect(ctx.stdout).to.contain('Successfully deleted alias hello')
          })
      })
    })

    describe('Deleting an alias without name', () => {
      test
        .stdout()
        .stub(Delete, 'storage', new MemoryStorage({}))
        .stub(FileUtil, 'storage', new MemoryStorage({}))
        .command(['alias:delete'])
        .it('should show the error that name is not provided', async ctx => {
          expect(await Delete.storage.load()).to.eql({

          })
          expect(ctx.stdout).to.contain('Please insert an alias argument to delete')
        })
    })
  })
})
