const { expect, test, assert } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const Export = require('../../src/commands/alias/Export')
const FileUtil = require('../../src/utilities/FileUtility')
const fs = require('fs');


describe('Tests for exporting alias', () => {

    describe('Before Setup', () => {

        describe('Exporting an empty file', () => {
            test
            .stdout()
            .stub(Export, 'storage', new MemoryStorage({  }, false))
            .stub(FileUtil, 'storage', new MemoryStorage({  }, false))
            .command(['alias:Export'])
            .it('should throw chalk error', async ctx => {
                expect(await FileUtil.storage.load()).to.eql({
                    
                })
            })
        })

        describe('Exporting with extra arguments', () => {
            test
            .stdout()
            .stub(Export, 'storage', new MemoryStorage({  }, false))
            .stub(FileUtil, 'storage', new MemoryStorage({  }, false))
            .command(['alias:Export', 'alist'])
            .it('extra arguments passed for export', async ctx => {
                expect(await FileUtil.storage.load()).to.eql({
                    
                })
                expect(ctx.stdout).to.contain("Invalid argument 'alist' provided");
            })
        })

    })


    describe('After Setup', () => {

        describe('Exporting an empty file', () => {
            
            const filename = 'dataexport1.json';
            const path = process.cwd() + '/' + filename;

            before(async function () {

                fs.open(path, 'w',  err => {
                    if (err) 
                    {
                        console.log(err);
                        return;
                    }
                });
            });

            test
            .stdout()
            .stub(Export, 'storage', new MemoryStorage({  }))
            .stub(FileUtil, 'storage', new MemoryStorage({  } ))
            .command(['alias:Export'])
            .it('export empty file', async ctx => {
                expect(await FileUtil.storage.load()).to.eql({
                    
                })
                expect(ctx.stdout).to.contain("Export Completed");
                
                //var data = JSON.parse(fs.readFileSync(path).toString());
                //expect(data).to.eql({});
            })

            after(async function () {

                fs.unlink(path, err => {
                    if (err) 
                    {
                        console.log(err);
                        return;
                    }
                });
            });
        })

        describe('Exporting filled list', () => {

            const filename = 'dataexport2.json';
            const path = process.cwd() + '/' + filename;

            before(async function () {

                fs.open(path, 'w',  err => {
                    if (err) 
                    {
                        console.log(err);
                        return;
                    }
                });
            });

            test
            .stdout()
            .stub(Export, 'storage', new MemoryStorage({ hello: "world", hello1: "world2" }))
            .stub(FileUtil, 'storage', new MemoryStorage({ hello: "world", hello1: "world2" } ))
            .command(['alias:Export'])
            .it('export filled file', async ctx => {
                expect(await FileUtil.storage.load()).to.eql({
                    hello: "world", 
                    hello1: "world2"
                })
                expect(ctx.stdout).to.contain("Export Completed");
                
                // var data = JSON.parse(fs.readFileSync(path).toString());
                // expect(data).to.eql({
                //     hello: "world", 
                //     hello1: "world2"
                // });
            })

            after(async function () {

                fs.unlink(path, err => {
                    if (err) 
                    {
                        console.log(err);
                        return;
                    }
                });
            });
        })

        describe('Exporting with extra arguments', () => {
            test
            .stdout()
            .stub(Export, 'storage', new MemoryStorage({  }))
            .stub(FileUtil, 'storage', new MemoryStorage({  } ))
            .command(['alias:Export', 'alist'])
            .it('extra arguments passed for export', async ctx => {
                expect(await FileUtil.storage.load()).to.eql({
                    
                })
                expect(ctx.stdout).to.contain("Invalid argument 'alist' provided");
            })
        })

    })

})