// const assert = require('chai').assert;
// const { expect, test } = require('@oclif/test')
// const FilesystemStorage = require('../../src/utilities/FileSnapshot/FilesystemStorage')
// const ContextUtil = require('../../src/utilities/ContextUtility')
// const FileUtil = require('../../src/utilities/FileUtility')
// const SetupFile = require('../../src/commands/alias/Setup')


// describe('file-system-storage', function () {

//     var aliasFilePath = '';
//     before(async function () {


//         const c = await SetupFile.run();
//         console.log(c);
//         // runs before all tests in this file regardless where this line is defined.
//         test
//             .stdout()
//             .command(['alias:Setup'])
//             .it('allow setup', async ctx => {
//                 expect(await Setup.storage.load())
//                 expect(ctx.stdout).to.contain("complete");
//             })

//         aliasFilePath = new FileUtil(c).getAliasFilePath();


//     });

//     console.log(aliasFilePath);
//     // let fileStorage = new FilesystemStorage();
//     // let db = fileStorage.load(aliasFilePath);

//     // console.log('alias file path for filesystemstorage ' + aliasFilePath);

//     // // test load function with valid path
//     // it('check for valid load function with valid path', function () {
//     //     async ctx => {
//     //         expect(db).to.eql(Promise.resolve())
//     //     }
//     // })

//     // // test save function
//     // fileStorage.save(db, aliasFilePath)
//     // it('check for valid save function with valid path', function () {
//     //     async ctx => {

//     //     }
//     // })

//     // // test load function with invalid path
//     // it('check for valid load function with invalid path', function () {
//     //     async ctx => {
//     //         expect(db).to.eql(Promise.resolve())
//     //     }
//     // })

// });