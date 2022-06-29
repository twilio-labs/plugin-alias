
const InquirerPrompts = require('../../src/utilities/InquirerPrompts')
const { prompt, expectPrompts } = require('./inq')
const { expect, test } = require('@oclif/test')
const FilesystemStorage = require('../../src/utilities/FileSnapshot/FilesystemStorage')
const ContextUtil = require('../../src/utilities/ContextUtility')
const FileUtil = require('../../src/utilities/FileUtility')
const fs = require('fs');

describe('Tests for prompts', function () {

    const filename = 'usagedata.json';
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




    describe('empty list suggestions', async function () {


        it('empty list suggestions, options = None', async function () {

            result = new InquirerPrompts(c, exit_message, 'he', db).constructSuggestions('he');
            expect(result.length).to.equal(0);


            createPrompts(result, 'Did you mean?', 0);
            expect(await prompt([
                {
                    name: 'promptAnswer',
                    message: 'Did you mean?',
                    type: 'list',
                    choices: [
                        { name: 'Continue without deleting', value: 'Continue without deleting' }
                    ]
                }
            ])).to.contain('inquirer was mocked and used without pending assertions')

        });


        it('empty list suggestions, options = "he" prefix', async function () {


            result = new InquirerPrompts(c, exit_message, 'he', db).constructSuggestions('he');
            expect(result.length).to.equal(0);


            createPrompts(result, 'Did you mean?', 0);
            expect(await prompt([
                {
                    name: 'promptAnswer',
                    message: 'Did you mean?',
                    type: 'list',
                    choices: [
                        { name: 'hello2', value: 'hello2' },
                        { name: 'hello1', value: 'hello1' },
                        { name: 'hello', value: 'hello' },
                        { name: 'Continue without deleting', value: 'Continue without deleting' }
                    ]
                }
            ])).to.contain('inquirer was mocked and used without pending assertions')

        });
    })



    describe('check with non-empty list, sugesstions exists', async function () {
        // fileStorage = new FilesystemStorage();
        // db = await fileStorage.load(path);

        it('testing with prefix "he", value = yes', async function () {

            db['hello'] = 'world';
            db['hello1'] = 'world1';
            db['hello2'] = 'world2';
            db['aelong'] = 'eworld1';
            db['aetong'] = 'eworld2';

            result = new InquirerPrompts(c, exit_message, 'he', db).constructSuggestions('he');
            expect(result.length).to.equal(3);

            createPrompts(result, 'Did you mean?', 0);

            const answers = await prompt([
                {
                    name: 'promptAnswer',
                    message: 'Did you mean?',
                    type: 'list',
                    choices: [
                        { name: 'hello2', value: 'hello2' },
                        { name: 'hello1', value: 'hello1' },
                        { name: 'hello', value: 'hello' },
                        { name: 'Continue without deleting', value: 'Continue without deleting' }
                    ]
                }
            ])

            expect(Object.entries(answers)[0][1]).to.equal('hello2')
            expect(await fileStorage.save(db, path));
        })



        it('testing with prefix "he", value = no ', async function () {
            result = new InquirerPrompts(c, exit_message, 'he', db).constructSuggestions('he');
            expect(result.length).to.equal(3);

            createPrompts(result, 'Did you mean?', 3);

            const answers = await prompt([
                {
                    name: 'promptAnswer',
                    message: 'Did you mean?',
                    type: 'list',
                    choices: [
                        { name: 'hello2', value: 'hello2' },
                        { name: 'hello1', value: 'hello1' },
                        { name: 'hello', value: 'hello' },
                        { name: 'Continue without deleting', value: 'Continue without deleting' }
                    ]
                }
            ])

            expect(Object.entries(answers)[0][1]).to.equal('Continue without deleting')

        })


        it('testing with prefix "ae", value = yes ', async function () {

            result = new InquirerPrompts(c, exit_message, 'ae', db).constructSuggestions('ae');
            expect(result.length).to.equal(2);

            createPrompts(result, 'Did you mean?', 1);

            const answers = await prompt([
                {
                    name: 'promptAnswer',
                    message: 'Did you mean?',
                    type: 'list',
                    choices: [

                        { name: 'aetong', value: 'aetong' },
                        { name: 'aelong', value: 'aelong' },
                        { name: 'Continue without deleting', value: 'Continue without deleting' }
                    ]
                }
            ])

            expect(Object.entries(answers)[0][1]).to.equal('aelong')

        })


        it('testing with prefix "yu", value = no ', async function () {
            result = new InquirerPrompts(c, exit_message, 'yu', db).constructSuggestions('yu');
            expect(result.length).to.equal(0);

            createPrompts(result, 'Did you mean?', 3);

            expect(await prompt([
                {
                    name: 'promptAnswer',
                    message: 'Did you mean?',
                    type: 'list',
                    choices: [
                        { name: 'Continue without deleting', value: 'Continue without deleting' }
                    ]
                }
            ])).to.contain('inquirer was mocked and used without pending assertions')



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



    function createPrompts(suggestions, message, index) {

        if (suggestions.length == 0) {
            return 'Continue without deleting';
        }

        suggestions.push('Continue without deleting');
        expectPrompts([

            {
                message: message,
                choices: suggestions,
                choose: index
            }
        ])

        return suggestions[index];

    }

})




