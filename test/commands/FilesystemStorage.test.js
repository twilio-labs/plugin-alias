const assert = require('chai').assert;
const { expect, test } = require('@oclif/test')
const FilesystemStorage = require('../../src/utilities/FileSnapshot/FilesystemStorage')
const ContextUtil = require('../../src/utilities/ContextUtility')
const FileUtil = require('../../src/utilities/FileUtility')
const fs = require('fs');



describe('Test for FilesystemStorage', function () {

    const filename = 'testdata.json';
    const path = process.cwd() + '/' + filename;

    before(async function () {

        fs.open(path, 'w', err => {
            if (err) {
                console.log(err);
                return;
            }
        });
    });


    describe('check for database load/store', async function () {

        it('save data', async function () {
            const fileStorage = new FilesystemStorage();
            const db = await fileStorage.load(path);
            expect(db).to.be.a('object');
            expect(Object.entries(db).length).to.equal(0);



            db['testAlias1'] = 'testName1';
            db['testAlias2'] = 'testName2';

            expect(Object.entries(db).length).to.not.equal(0);


            expect(await fileStorage.save(db, path));

        })

        it('load data', async function () {

            const fileStorage = new FilesystemStorage();
            const db = await fileStorage.load(path);
            expect(db).to.be.a('object');
            expect(Object.entries(db).length).to.not.equal(0);


        })

    })


    after(async function () {

        fs.unlink(path, err => {
            if (err) {
                console.log(err);
                return;
            }
        });
    });




});