const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Export = require('../../src/commands/alias/export.js')
const FileUtil = require('../../src/utilities/FileUtility')
const fs = require('fs')
const FilesystemStorage = require('../../src/utilities/FileSnapshot/FilesystemStorage')

describe('Tests for exporting alias', () => {
  describe('Before Setup', () => {
    describe('Exporting an empty file', () => {
      test
        .stdout()
        .stub(Export, 'storage', new MemoryStorage({}, false))
        .stub(FileUtil, 'storage', new MemoryStorage({}, false))
        .command(['alias:export'])
        .it('should throw chalk error', async ctx => {
          expect(await FileUtil.storage.load()).to.eql({

          })
        })
    })

    describe('Exporting with extra arguments', () => {
      test
        .stdout()
        .stub(Export, 'storage', new MemoryStorage({}, false))
        .stub(FileUtil, 'storage', new MemoryStorage({}, false))
        .command(['alias:export', 'alist'])
        .it('extra arguments passed for export', async ctx => {
          expect(await FileUtil.storage.load()).to.eql({

          })
          expect(ctx.stdout).to.contain("Invalid argument 'alist' provided")
        })
    })
  })

  describe('After Setup', () => {
    describe('Exporting an empty file', () => {
      const filename = 'dataexport.json'
      const path = process.cwd() + '/' + filename

      before(async function () {
        fs.open(path, 'w', err => {
          if (err) {
            console.log(err)
          }
        })
      })

      test
        .stdout()
        .stub(Export, 'storage', new MemoryStorage({}))
        .stub(FileUtil, 'storage', new MemoryStorage({}))
        .command(['alias:export'])
        .it('export empty file', async ctx => {
          expect(await FileUtil.storage.load()).to.eql({

          })
          expect(ctx.stdout).to.contain('Successfully exported aliases to the file dataexport.json')

          const fileStorage = new FilesystemStorage()
          const db = await fileStorage.load(path)
          expect(db).to.be.a('object')
          expect(Object.entries(db).length).to.equal(0)
        })

      after(async function () {
        fs.unlink(path, err => {
          if (err) {
            console.log(err)
          }
        })
      })
    })

    describe('Exporting filled list', () => {
      const filename = 'dataexport.json'
      const path = process.cwd() + '/' + filename

      before(async function () {
        fs.open(path, 'w', err => {
          if (err) {
            console.log(err)
          }
        })
      })

      test
        .stdout()
        .stub(Export, 'storage', new MemoryStorage({ hello: 'world', hello1: 'world2' }))
        .stub(FileUtil, 'storage', new MemoryStorage({ hello: 'world', hello1: 'world2' }))
        .command(['alias:export'])
        .it('export filled file', async ctx => {
          expect(await FileUtil.storage.load()).to.eql({
            hello: 'world',
            hello1: 'world2'
          })
          expect(ctx.stdout).to.contain('Successfully exported aliases to the file dataexport.json')
          const fileStorage = new FilesystemStorage()
          const db = await fileStorage.load(path)
          expect(db).to.be.a('object')
          expect(Object.entries(db).length).to.not.equal(0)

          expect(Object.entries(db)[0].toString).to.equal(['hello', 'world'].toString)
          expect(Object.entries(db)[1].toString).to.equal(['hello1', 'world2'].toString)
        })

      after(async function () {
        fs.unlink(path, err => {
          if (err) {
            console.log(err)
          }
        })
      })
    })

    describe('Exporting with extra arguments', () => {
      test
        .stdout()
        .stub(Export, 'storage', new MemoryStorage({}))
        .stub(FileUtil, 'storage', new MemoryStorage({}))
        .command(['alias:export', 'alist'])
        .it('extra arguments passed for export', async ctx => {
          expect(await FileUtil.storage.load()).to.eql({

          })
          expect(ctx.stdout).to.contain("Invalid argument 'alist' provided")
        })
    })
  })
})
