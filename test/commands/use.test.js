const { expect, test } = require('@oclif/test')
const MemoryStorage = require('../../src/utilities/FileSnapshot/MemoryStorage.js')
const InquirerPrompts = require('../../src/utilities/InquirerPrompts')
const Delete = require('../../src/commands/alias/delete.js')
const List = require('../../src/commands/alias/list.js')
const Use = require('../../src/commands/alias/use.js')
const FileUtil = require('../../src/utilities/FileUtility')
const inquirer = require('inquirer');
const ContextUtil = require('../../src/utilities/ContextUtility')
const FilesystemStorage = require('../../src/utilities/FileSnapshot/FilesystemStorage')
const fs = require('fs');
const assert = require('chai').assert;
const { prompt, expectPrompts } = require('../helpers/inquirerhelper')

describe('Tests for using alias', () => {

  describe('Before Setup', () => {

    describe('Use an alias which does not exist', () => {
      test
        .stdout()
        .stub(Use, 'storage', new MemoryStorage({}, false))
        .stub(List, 'storage', new MemoryStorage({}, false))
        .stub(FileUtil, 'storage', new MemoryStorage({}, false))
        .command(['alias:use', 'alist'])
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
        .command(['alias:use'])
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

    describe('Use an existing alias with alias:use', () => {
      test
        .stdout()
        .stub(Use, 'storage', new MemoryStorage({ alist: "alias:list" }))
        .stub(List, 'storage', new MemoryStorage({ alist: "alias:list" }))
        .stub(FileUtil, 'storage', new MemoryStorage({ alist: "alias:list" }))
        .command(['alias:use', 'alist'])
        .it('should use the alias to list aliases', async ctx => {
          expect(await Use.storage.load()).to.eql({
            alist: "alias:list"
          })
          expect(ctx.stdout).to.contain("Alias\tCommand\nalist\talias:list");
        })
    })


    describe('Use an existing alias with "use"', () => {
      test
        .stdout()
        .stub(Use, 'storage', new MemoryStorage({ alist: "alias:list" }))
        .stub(List, 'storage', new MemoryStorage({ alist: "alias:list" }))
        .stub(FileUtil, 'storage', new MemoryStorage({ alist: "alias:list" }))
        .command(['use', 'alist'])
        .it('should use "use" to list aliases', async ctx => {
          expect(await Use.storage.load()).to.eql({
            alist: "alias:list"
          })
          expect(ctx.stdout).to.contain("Alias\tCommand\nalist\talias:list");
        })
    })


    describe('Use an alias which does not exist', function () {

      const filename = 'usedata.json';
      const path = process.cwd() + '/' + filename;
      let c, exit_message, result, db, fileStorage, original;

      before(async function () {

        c = await ContextUtil.run();
        exit_message = 'Testing use prompts';
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
                { name: 'Continue without using', value: 'Continue without using' }
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
                { name: 'Continue without using', value: 'Continue without using' }
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
                { name: 'hello', value: 'hello' },
                { name: 'hello1', value: 'hello1' },
                { name: 'hello2', value: 'hello2' },
                { name: 'Continue without using', value: 'Continue without using' }
              ]
            }
          ])

          expect(Object.entries(answers)[0][1]).to.equal('hello')

          expect(original).to.eql(Object.entries(db).length);
          expect(Object.entries(db)[2][0]).to.contain('hello');
          expect(await fileStorage.save(db, path));

        })



        it('testing with prefix "he", value = no ', async function () {

          result = new InquirerPrompts(c, exit_message, 'he', db).constructSuggestions('he');
          expect(result.length).to.equal(3);
          original = Object.entries(db).length;
          createPrompts(result, 'Did you mean?', 2);

          const answers = await prompt([
            {
              name: 'promptAnswer',
              message: 'Did you mean?',
              type: 'list',
              choices: [
                { name: 'hello', value: 'hello' },
                { name: 'hello1', value: 'hello1' },
                { name: 'hello2', value: 'hello2' },
                { name: 'Continue without using', value: 'Continue without using' }
              ]
            }
          ])

          expect(original).to.eql(Object.entries(db).length);

        })


        it('testing with prefix "ae", value = yes ', async function () {

          original = Object.entries(db).length;

          result = new InquirerPrompts(c, exit_message, 'ae', db).constructSuggestions('ae');
          expect(result.length).to.equal(3);

          createPrompts(result, 'Did you mean?', 1);

          const answers = await prompt([
            {
              name: 'promptAnswer',
              message: 'Did you mean?',
              type: 'list',
              choices: [

                { name: 'aelong', value: 'aelong' },
                { name: 'aetong', value: 'aetong' },
                { name: 'hello', value: 'hello' },
                { name: 'Continue without using', value: 'Continue without using' }
              ]
            }
          ])

          expect(Object.entries(answers)[0][1]).to.equal('aetong')



          expect(original).to.eql(Object.entries(db).length);
          expect(Object.entries(db)[4][0]).to.contain('aetong');
          expect(await fileStorage.save(db, path));

        })


        // it('testing with prefix "yu", value = no ', async function () {

        //   original = Object.entries(db).length;

        //   result = new InquirerPrompts(c, exit_message, 'yu', db).constructSuggestions('yu');
        //   expect(result.length).to.equal(0);

        //   createPrompts(result, 'Did you mean?', 3);

        //   expect(await prompt([
        //     {
        //       name: 'promptAnswer',
        //       message: 'Did you mean?',
        //       type: 'list',
        //       choices: [
        //         { name: 'Continue without using', value: 'Continue without using' }
        //       ]
        //     }
        //   ])).to.contain('inquirer was mocked and used without pending assertions')


        //   expect(original).to.eql(Object.entries(db).length);
        //   expect(await fileStorage.save(db, path));
        // })


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
          return 'Continue without using';
        }

        suggestions.push('Continue without using');
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


    describe('Use an alias without name', () => {
      test
        .stdout()
        .stub(Use, 'storage', new MemoryStorage({ alist: "alias:list" }))
        .stub(List, 'storage', new MemoryStorage({ alist: "alias:list" }))
        .stub(FileUtil, 'storage', new MemoryStorage({ alist: "alias:list" }))
        .command(['alias:use'])
        .it('should give warning that alias name not provided', async ctx => {
          expect(await Use.storage.load()).to.eql({
            alist: "alias:list"
          })
          expect(ctx.stdout).to.contain("Please insert an alias argument");
        })
    })

    describe('Use an alias with "use" without name', () => {
      test
        .stdout()
        .stub(Use, 'storage', new MemoryStorage({ alist: "alias:list" }))
        .stub(List, 'storage', new MemoryStorage({ alist: "alias:list" }))
        .stub(FileUtil, 'storage', new MemoryStorage({ alist: "alias:list" }))
        .command(['use'])
        .it('should give warning that alias name not provided', async ctx => {
          expect(await Use.storage.load()).to.eql({
            alist: "alias:list"
          })
          expect(ctx.stdout).to.contain("Please insert an alias argument");
        })
    })


  })

})
