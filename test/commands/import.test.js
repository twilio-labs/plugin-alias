const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Import = require('../../src/commands/alias/import')
const FileUtil = require('../../src/utilities/FileUtility')
const fs = require('fs')

describe('Tests for importing alias', () => {
  describe('Before Setup', () => {
    describe('Importing an empty file', () => {
      const filename = 'dataexport1.json'

      test
        .stdout()
        .stub(Import, 'storage', new MemoryStorage({}, false))
        .stub(FileUtil, 'storage', new MemoryStorage({}, false))
        .command(['alias:import', `${filename}`])
        .it('should throw chalk error', async _ctx => {
          expect(await FileUtil.storage.load()).to.eql({
          })
        })
    })

    describe('Importing with invalid file path', () => {
      test
        .stdout()
        .stub(Import, 'storage', new MemoryStorage({}, false, false))
        .stub(FileUtil, 'storage', new MemoryStorage({}, false, false))
        .command(['alias:import', 'hsagfhb.sahdg'])
        .it('should throw error that file does not exist', async ctx => {
          expect(await FileUtil.storage.load()).to.eql({
          })
          expect(ctx.stdout).to.contain('alias file does not exist at the specified path')
        })
    })

    describe('Importing without file path', () => {
      test
        .stdout()
        .stub(Import, 'storage', new MemoryStorage({}, false))
        .stub(FileUtil, 'storage', new MemoryStorage({}, false))
        .command(['alias:import'])
        .it('should throw error that file path not provided', async ctx => {
          expect(await FileUtil.storage.load()).to.eql({
          })
          expect(ctx.stdout).to.contain('please add the path of the alias.json file')
        })
    })
  })

  describe('After Setup', () => {
    describe('Importing an empty file', () => {
      const filename = 'dataexport1.json'
      const path = process.cwd() + '/' + filename

      before(async function () {
        const db = {
        }

        fs.writeFile(path, JSON.stringify(db), err => {
          if (err) {
            console.log(err)
          }
        })
      })

      test
        .stdout()
        .stub(Import, 'storage', new MemoryStorage({}))
        .stub(FileUtil, 'storage', new MemoryStorage({}))
        .command(['alias:import', `${filename}`])
        .it('import empty file', async ctx => {
          expect(await FileUtil.storage.load()).to.eql({

          })
          expect(ctx.stdout).to.contain(`Successfully exported aliases to the file ${filename}`)
        })

      after(async function () {
        fs.unlink(path, err => {
          if (err) {
            console.log(err)
          }
        })
      })
    })

    describe('Importing file with data', () => {
      const filename = 'dataexport2.json'
      const path = process.cwd() + '/' + filename

      before(async function () {
        const db = {
          alist: 'alias:list',
          hello: 'world'
        }

        fs.writeFile(path, JSON.stringify(db), err => {
          if (err) {
            console.log(err)
          }
        })
      })

      test
        .stdout()
        .stub(Import, 'storage', new MemoryStorage({}))
        .stub(FileUtil, 'storage', new MemoryStorage({}))
        .command(['alias:import', `${filename}`])
        .it('import file with data', async ctx => {
          expect(await FileUtil.storage.load()).to.eql({
            alist: 'alias:list',
            hello: 'world'
          })
          expect(ctx.stdout).to.contain(`Successfully exported aliases to the file ${filename}`)
        })

      after(async function () {
        fs.unlink(path, err => {
          if (err) {
            console.log(err)
          }
        })
      })
    })

    describe('Importing with invalid file path', () => {
      test
        .stdout()
        .stub(Import, 'storage', new MemoryStorage({}, true, false))
        .stub(FileUtil, 'storage', new MemoryStorage({}, true, false))
        .command(['alias:import', 'hsagfhb.sahdg'])
        .it('should throw error that file does not exist', async ctx => {
          expect(await FileUtil.storage.load()).to.eql({
          })
          expect(ctx.stdout).to.contain('alias file does not exist at the specified path')
        })
    })

    describe('Importing without file path', () => {
      test
        .stdout()
        .stub(Import, 'storage', new MemoryStorage({}))
        .stub(FileUtil, 'storage', new MemoryStorage({}))
        .command(['alias:import'])
        .it('should throw error that file path not provided', async ctx => {
          expect(await FileUtil.storage.load()).to.eql({
          })
          expect(ctx.stdout).to.contain('please add the path of the alias.json file')
        })
    })
  })
})
