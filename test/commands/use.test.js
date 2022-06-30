const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const List = require('../../src/commands/alias/list.js')
const Use = require('../../src/commands/alias/use.js')
const FileUtil = require('../../src/utilities/FileUtility')
const MockPrompts = require('../../src/utilities/mockPrompt')

describe('Tests for using alias', () => {
  describe('Before Setup', () => {
    describe('Use an alias which does not exist', () => {
      test
        .stdout()
        .stub(Use, 'storage', new MemoryStorage({}, false))
        .stub(List, 'storage', new MemoryStorage({}, false))
        .stub(FileUtil, 'storage', new MemoryStorage({}, false))
        .command(['alias:use', 'alist'])
        .it('should throw the chalk error', async ctx => {
          expect(await Use.storage.load()).to.eql({
          })
        })
    })

    describe('Use an alias without name', () => {
      test
        .stdout()
        .stub(Use, 'storage', new MemoryStorage({}, false))
        .stub(List, 'storage', new MemoryStorage({}, false))
        .stub(FileUtil, 'storage', new MemoryStorage({}, false))
        .command(['alias:use'])
        .it('should give warning that alias name not provided', async ctx => {
          expect(await Use.storage.load()).to.eql({

          })
          expect(ctx.stdout).to.contain('Please insert an alias argument')
        })
    })

    describe('Use an alias with "use" without name', () => {
      test
        .stdout()
        .stub(Use, 'storage', new MemoryStorage({}, false))
        .stub(List, 'storage', new MemoryStorage({}, false))
        .stub(FileUtil, 'storage', new MemoryStorage({}, false))
        .command(['use'])
        .it('should give warning that alias name not provided', async ctx => {
          expect(await Use.storage.load()).to.eql({

          })
          expect(ctx.stdout).to.contain('Please insert an alias argument')
        })
    })
  })

  describe('After Setup', () => {
    describe('Use an existing alias with alias:use', () => {
      test
        .stdout()
        .stub(Use, 'storage', new MemoryStorage({ alist: 'alias:list' }))
        .stub(List, 'storage', new MemoryStorage({ alist: 'alias:list' }))
        .stub(FileUtil, 'storage', new MemoryStorage({ alist: 'alias:list' }))
        .command(['alias:use', 'alist'])
        .it('should use the alias to list aliases', async ctx => {
          expect(await Use.storage.load()).to.eql({
            alist: 'alias:list'
          })
          expect(ctx.stdout).to.contain('Alias\tCommand\nalist\talias:list')
        })
    })

    describe('Use an existing alias with "use"', () => {
      test
        .stdout()
        .stub(Use, 'storage', new MemoryStorage({ alist: 'alias:list' }))
        .stub(List, 'storage', new MemoryStorage({ alist: 'alias:list' }))
        .stub(FileUtil, 'storage', new MemoryStorage({ alist: 'alias:list' }))
        .command(['use', 'alist'])
        .it('should use "use" to list aliases', async ctx => {
          expect(await Use.storage.load()).to.eql({
            alist: 'alias:list'
          })
          expect(ctx.stdout).to.contain('Alias\tCommand\nalist\talias:list')
        })
    })

    describe("Using an alias which doesn't exists", () => {
      describe('Suggestions not accepted', () => {
        test
          .stdout()
          .stub(Use, 'prompt', new MockPrompts('Continue without using'))
          .stub(Use, 'storage', new MemoryStorage({ hello: 'world', hello2: 'world2' }))
          .stub(FileUtil, 'storage', new MemoryStorage({ hello: 'world', hello2: 'world2' }))
          .command(['alias:use', 'he'])
          .it('should show the suggestions but not accepted', async ctx => {
            expect(await Use.storage.load()).to.eql({
              hello: 'world',
              hello2: 'world2'
            })
            expect(ctx.stdout).to.contain('command he is not found')
          })
      })

      describe('Suggestion accepted', () => {
        test
          .stdout()
          .stub(Use, 'prompt', new MockPrompts('hello'))
          .stub(Use, 'storage', new MemoryStorage({ hello: 'world', hello2: 'world2' }))
          .stub(FileUtil, 'storage', new MemoryStorage({ hello: 'world', hello2: 'world2' }))
          .command(['alias:use', 'he'])
          .it('should show the suggestions but accepted', async ctx => {
            expect(await Use.storage.load()).to.eql({
              hello: 'world',
              hello2: 'world2'
            })
            expect(ctx.stdout).to.contain('command world is not found')
          })
      })
    })

    describe('Use an alias without name', () => {
      test
        .stdout()
        .stub(Use, 'storage', new MemoryStorage({ alist: 'alias:list' }))
        .stub(List, 'storage', new MemoryStorage({ alist: 'alias:list' }))
        .stub(FileUtil, 'storage', new MemoryStorage({ alist: 'alias:list' }))
        .command(['alias:use'])
        .it('should give warning that alias name not provided', async ctx => {
          expect(await Use.storage.load()).to.eql({
            alist: 'alias:list'
          })
          expect(ctx.stdout).to.contain('Please insert an alias argument')
        })
    })

    describe('Use an alias with "use" without name', () => {
      test
        .stdout()
        .stub(Use, 'storage', new MemoryStorage({ alist: 'alias:list' }))
        .stub(List, 'storage', new MemoryStorage({ alist: 'alias:list' }))
        .stub(FileUtil, 'storage', new MemoryStorage({ alist: 'alias:list' }))
        .command(['use'])
        .it('should give warning that alias name not provided', async ctx => {
          expect(await Use.storage.load()).to.eql({
            alist: 'alias:list'
          })
          expect(ctx.stdout).to.contain('Please insert an alias argument')
        })
    })
  })
})
