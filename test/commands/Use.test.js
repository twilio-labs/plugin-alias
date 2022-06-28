const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Use = require('../../src/commands/alias/Use')
const List = require('../../src/commands/alias/List')
const FileUtil = require('../../src/utilities/FileUtility')

describe('Tests for using alias', () => {

  describe('Before Setup', () => {

    describe('Use an alias which does not exist', () => {
      test
        .stdout()
        .stub(Use, 'storage', new MemoryStorage({}, false))
        .stub(List, 'storage', new MemoryStorage({}, false))
        .stub(FileUtil, 'storage', new MemoryStorage({}, false))
        .command(['alias:Use', 'alist'])
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
        .command(['alias:Use'])
        .it('should give warning that alias name not provided', async ctx => {
          expect(await Use.storage.load()).to.eql({

          })
          expect(ctx.stdout).to.contain("Please insert an alias argument");
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
          expect(ctx.stdout).to.contain("Please insert an alias argument");
        })
    })

  })


  describe('After Setup', () => {

    describe('Use an existing alias with alias:Use', () => {
      test
        .stdout()
        .stub(Use, 'storage', new MemoryStorage({ alist: "alias:List" }))
        .stub(List, 'storage', new MemoryStorage({ alist: "alias:List" }))
        .stub(FileUtil, 'storage', new MemoryStorage({ alist: "alias:List" }))
        .command(['alias:Use', 'alist'])
        .it('should use the alias to list aliases', async ctx => {
          expect(await Use.storage.load()).to.eql({
            alist: "alias:List"
          })
          expect(ctx.stdout).to.contain("Alias\tCommand\nalist\talias:List");
        })
    })


    describe('Use an existing alias with "use"', () => {
      test
        .stdout()
        .stub(Use, 'storage', new MemoryStorage({ alist: "alias:List" }))
        .stub(List, 'storage', new MemoryStorage({ alist: "alias:List" }))
        .stub(FileUtil, 'storage', new MemoryStorage({ alist: "alias:List" }))
        .command(['use', 'alist'])
        .it('should use "use" to list aliases', async ctx => {
          expect(await Use.storage.load()).to.eql({
            alist: "alias:List"
          })
          expect(ctx.stdout).to.contain("Alias\tCommand\nalist\talias:List");
        })
    })

    // describe('Use an alias which does not exist', () => {
    //   test
    //     .stdout()
    //     .stub(Use, 'storage', new MemoryStorage({}))
    //     .stub(List, 'storage', new MemoryStorage({}))
    //     .stub(FileUtil, 'storage', new MemoryStorage({}))
    //     .command(['alias:Use', 'alist'])
    //     .it('should return command not found from empty', async ctx => {
    //       expect(await Use.storage.load()).to.eql({
    //       })
    //       expect(ctx.stdout).to.contain("command alist is not found");
    //     })
    // })


    // describe('Use an alias which does not exist', () => {
    //   test
    //     .stdout()
    //     .stub(Use, 'storage', new MemoryStorage({ alist: "alias:List", alist2: "alias:List", alist3: "alia:List" }))
    //     .stub(List, 'storage', new MemoryStorage({ alist: "alias:List", alist2: "alias:List", alist3: "alia:List" }))
    //     .stub(FileUtil, 'storage', new MemoryStorage({ alist: "alias:List", alist2: "alias:List", alist3: "alia:List" }))
    //     .command(['alias:Use', 'ali'])
    //     .it('should show some suggestions', async ctx => {
    //       expect(await Use.storage.load())
    //       // .to.eql({
    //       // })
    //       // expect(ctx.stdout).to.contain("command alist is not found");
    //     })
    // })



    describe('Use an alias without name', () => {
      test
        .stdout()
        .stub(Use, 'storage', new MemoryStorage({ alist: "alias:List" }))
        .stub(List, 'storage', new MemoryStorage({ alist: "alias:List" }))
        .stub(FileUtil, 'storage', new MemoryStorage({ alist: "alias:List" }))
        .command(['alias:Use'])
        .it('should give warning that alias name not provided', async ctx => {
          expect(await Use.storage.load()).to.eql({
            alist: "alias:List"
          })
          expect(ctx.stdout).to.contain("Please insert an alias argument");
        })
    })

    describe('Use an alias with "use" without name', () => {
      test
        .stdout()
        .stub(Use, 'storage', new MemoryStorage({ alist: "alias:List" }))
        .stub(List, 'storage', new MemoryStorage({ alist: "alias:List" }))
        .stub(FileUtil, 'storage', new MemoryStorage({ alist: "alias:List" }))
        .command(['use'])
        .it('should give warning that alias name not provided', async ctx => {
          expect(await Use.storage.load()).to.eql({
            alist: "alias:List"
          })
          expect(ctx.stdout).to.contain("Please insert an alias argument");
        })
    })


  })

})