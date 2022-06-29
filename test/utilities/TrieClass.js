const assert = require('chai').assert;
const { expect, test } = require('@oclif/test')
const FilesystemStorage = require('../../src/utilities/FileSnapshot/FilesystemStorage')
const ContextUtil = require('../../src/utilities/ContextUtility')
const InquirerPrompts = require('../../src/utilities/InquirerPrompts')
const FileUtil = require('../../src/utilities/FileUtility')
const fs = require('fs');



describe('Tests for Inquirer Prompts', function () {

    describe('provide suggestions for query', async function () {

        const filename = 'inquirerdata.json';
        const path = process.cwd() + '/' + filename;
        let c, exit_message, result, db, fileStorage;

        before(async function () {

            c = await ContextUtil.run();
            exit_message = 'Testing prompts';
            fs.open(path, 'w', err => {
                if (err) {
                    console.log(err);
                    return;
                }
            });

            fileStorage = new FilesystemStorage();
            db = await fileStorage.load(path);
        })


        it('empty list suggestions', async function () {

            expect(db).to.be.a('object');
            expect(Object.entries(db).length).to.equal(0);

            result = new InquirerPrompts(c, exit_message, 'he', db).constructSuggestions('he');
            expect(result.length).to.equal(0);


            result = new InquirerPrompts(c, exit_message, 'al', db).constructSuggestions('al');
            expect(result.length).to.equal(0);

        })



        it('with non-empty list, suggestions exists', async function () {

            db['hello'] = 'world';
            db['hello1'] = 'world1';
            db['hello2'] = 'world2';
            db['aelong'] = 'eworld1';
            db['aetong'] = 'eworld2';


            result = new InquirerPrompts(c, exit_message, 'he', db).constructSuggestions('he');
            expect(result.length).to.equal(3);

            result = new InquirerPrompts(c, exit_message, 'ae', db).constructSuggestions('ae');
            expect(result.length).to.equal(2);

            result = new InquirerPrompts(c, exit_message, 'aet', db).constructSuggestions('aet');
            expect(result.length).to.equal(1);

            expect(await fileStorage.save(db, path));
        })



        it('with non-empty list, suggestions do not exist', async function () {


            result = new InquirerPrompts(c, exit_message, 'he', db).constructSuggestions('he');
            expect(result.length).to.equal(3);

            result = new InquirerPrompts(c, exit_message, 'k', db).constructSuggestions('k');
            expect(result.length).to.equal(0);

        })



        after(async function () {

            fs.unlink(path, err => {
                if (err) {
                    console.log(err);
                    return;
                }
            });
        });



    })


})
