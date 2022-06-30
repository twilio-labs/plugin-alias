const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Setup = require('../../src/commands/alias/setup.js')
const FileUtil = require('../../src/utilities/FileUtility')

describe('Tests for setup', () => {
  describe('Setup when alias folder does not exists', () => {
    test
      .stdout()
      .stub(Setup, 'storage', new MemoryStorage({}, false))
      .stub(FileUtil, 'storage', new MemoryStorage({}, false))
      .command(['alias:setup'])
      .it('should setup and initialize the empty data', async ctx => {
        expect(await Setup.storage.load()).to.eql({
        })
        expect(ctx.stdout).to.contain('Setup complete')
      })
  })

  describe('Setup when alias already exists', () => {
    test
      .stdout()
      .stub(Setup, 'storage', new MemoryStorage({}, true))
      .stub(FileUtil, 'storage', new MemoryStorage({}, true))
      .command(['alias:setup'])
      .it('should throw setup already complete warning', async ctx => {
        expect(await Setup.storage.load()).to.eql({
        })
        expect(ctx.stdout).to.contain('Setup already complete')
      })
  })

  describe('Setup with extra arguments', () => {
    test
      .stdout()
      .stub(Setup, 'storage', new MemoryStorage({}, false))
      .stub(FileUtil, 'storage', new MemoryStorage({}, false))
      .command(['alias:setup', 'alist'])
      .it('should throw error that extra arguments provided', async ctx => {
        expect(await Setup.storage.load()).to.eql({
        })
        expect(ctx.stdout).to.contain("Invalid argument 'alist' provided")
      })
  })
})
