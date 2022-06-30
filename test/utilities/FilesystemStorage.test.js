const { expect } = require('@oclif/test')
const FilesystemStorage = require('../../src/utilities/FileSnapshot/FilesystemStorage')
const ContextUtil = require('../../src/utilities/ContextUtility')
const FileUtil = require('../../src/utilities/FileUtility')
const fs = require('fs')

describe('Test for FilesystemStorage', function () {
  const filename = 'testdata.json'
  const path = process.cwd() + '/' + filename

  before(async function () {
    fs.open(path, 'w', err => {
      if (err) {
        console.log(err)
      }
    })
  })

  describe('test for path validity', async function () {
    it('load context path', async function () {
      const c = await ContextUtil.run()
      const aliasFilePath = new FileUtil(c).getAliasFilePath()
      const fileStorage = new FilesystemStorage()
      expect(fileStorage.pathExists(aliasFilePath)).to.be.a('boolean')
    })

    it('load path from config', async function () {
      const c = await ContextUtil.run()
      const aliasFilePath = new FilesystemStorage().path(c)
      expect(new FilesystemStorage().pathExists(aliasFilePath)).to.be.a('boolean')
    })

    it('load path from config', async function () {
      expect(new FilesystemStorage().importPathExists(path)).to.be.a('boolean')
    })
  })

  describe('check for database load/store', async function () {
    it('save data', async function () {
      const fileStorage = new FilesystemStorage()
      const db = await fileStorage.load(path)
      expect(db).to.be.a('object')
      expect(Object.entries(db).length).to.equal(0)

      db.testAlias1 = 'testName1'
      db.testAlias2 = 'testName2'

      expect(Object.entries(db).length).to.not.equal(0)

      expect(await fileStorage.save(db, path))
    })

    it('load data', async function () {
      const fileStorage = new FilesystemStorage()
      const db = await fileStorage.load(path)
      expect(db).to.be.a('object')
      expect(Object.entries(db).length).to.not.equal(0)
    })
  })

  after(async function () {
    fs.unlink(path, err => {
      if (err) {
        console.log(err)
      }
    })
  })
})
