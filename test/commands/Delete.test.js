const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const InquirerPrompts = require('../../src/utilities/InquirerPrompts')
const Delete = require('../../src/commands/alias/Delete.js')
const FileUtil = require('../../src/utilities/FileUtility')
const inquirer = require('inquirer');
const ContextUtil = require('../../src/utilities/ContextUtility')
const FilesystemStorage = require('../../src/utilities/FileSnapshot/FilesystemStorage')
const fs = require('fs');
const assert = require('chai').assert;
const { prompt, expectPrompts } = require('../helpers/inquirerhelper')


describe('Tests for deleting alias', () => {

    describe('Before Setup', () => {

        describe('Deleting an alias which does not exists in an empty list', () => {
            test
                .stdout()
                .stub(Delete, 'storage', new MemoryStorage({}, false))
                .stub(FileUtil, 'storage', new MemoryStorage({}, false))
                .command(['alias:Delete', 'hello'])
                .it('should throw the chalk error', async ctx => {
                    expect(await Delete.storage.load()).to.eql({

                    })
                })
        })


        describe('Deleting an alias without name', () => {
            test
                .stdout()
                .stub(Delete, 'storage', new MemoryStorage({}, false))
                .stub(FileUtil, 'storage', new MemoryStorage({}, false))
                .command(['alias:Delete'])
                .it('should show the error that name is not provided', async ctx => {
                    expect(await Delete.storage.load()).to.eql({

                    })
                    expect(ctx.stdout).to.contain('Please insert an alias argument to delete');
                })
        })

    })


    describe('After Setup', () => {

        describe('Deleting an alias which already exists', () => {
            test
                .stdout()
                .stub(Delete, 'storage', new MemoryStorage({ hello: "world", hello2: "world2" }))
                .stub(FileUtil, 'storage', new MemoryStorage({ hello: "world", hello2: "world2" }))
                .command(['alias:Delete', 'hello'])
                .it('should delete the alias', async ctx => {
                    expect(await Delete.storage.load()).to.eql({
                        hello2: "world2"
                    })
                })
        })




        describe('Delete an alias which does not exist', function () {

            const filename = 'deletedata.json';
            const path = process.cwd() + '/' + filename;
            let c, exit_message, result, db, fileStorage, original;

            before(async function () {

                c = await ContextUtil.run();
                exit_message = 'Testing delete prompts';
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
                    original = Object.entries(db).length;
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
                    expect(original).to.eql(Object.entries(db).length);
                });


                it('empty list suggestions, options = "he" prefix', async function () {

                    original = Object.entries(db).length;

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

                    expect(original).to.eql(Object.entries(db).length);
                });
            })



            describe('check with non-empty list, sugesstions exists', async function () {


                it('testing with prefix "he", value = yes', async function () {

                    db['hello'] = 'world';
                    db['hello1'] = 'world1';
                    db['hello2'] = 'world2';
                    db['aelong'] = 'eworld1';
                    db['aetong'] = 'eworld2';

                    original = Object.entries(db).length;

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

                    delete db['hello2'];
                    expect(original - 1).to.eql(Object.entries(db).length);
                    expect(Object.entries(db)).to.not.contain('hello2');
                    expect(await fileStorage.save(db, path));
                })



                it('testing with prefix "he", value = no ', async function () {

                    result = new InquirerPrompts(c, exit_message, 'he', db).constructSuggestions('he');
                    expect(result.length).to.equal(2);
                    original = Object.entries(db).length;
                    createPrompts(result, 'Did you mean?', 2);

                    const answers = await prompt([
                        {
                            name: 'promptAnswer',
                            message: 'Did you mean?',
                            type: 'list',
                            choices: [
                                { name: 'hello1', value: 'hello1' },
                                { name: 'hello', value: 'hello' },
                                { name: 'Continue without deleting', value: 'Continue without deleting' }
                            ]
                        }
                    ])

                    expect(original).to.eql(Object.entries(db).length);
                    expect(Object.entries(answers)[0][1]).to.equal('Continue without deleting')

                })


                it('testing with prefix "ae", value = yes ', async function () {

                    original = Object.entries(db).length;

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


                    delete db['aelong'];
                    expect(original - 1).to.eql(Object.entries(db).length);
                    expect(Object.entries(db)).to.not.contain('aelong');
                    expect(await fileStorage.save(db, path));

                })


                it('testing with prefix "yu", value = no ', async function () {

                    original = Object.entries(db).length;

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


                    expect(original).to.eql(Object.entries(db).length);
                    expect(await fileStorage.save(db, path));
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





        describe('Deleting an alias without name', () => {
            test
                .stdout()
                .stub(Delete, 'storage', new MemoryStorage({}))
                .stub(FileUtil, 'storage', new MemoryStorage({}))
                .command(['alias:Delete'])
                .it('should show the error that name is not provided', async ctx => {
                    expect(await Delete.storage.load()).to.eql({

                    })
                    expect(ctx.stdout).to.contain('Please insert an alias argument to delete');
                })
        })

    })

})