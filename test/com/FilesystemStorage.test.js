const assert = require('chai').assert;
const FilesystemStorage = require('../../src/utilities/FileSnapshot/FilesystemStorage')

describe('FilesystemStorage test', function(){
   
    let fileStorage = new FilesystemStorage();
    let db = fileStorage.load("/Users/stiwari/.local/share/@oclif/plugin-alias/alias/data.json");
    
    // test load function with valid path
    it('check for valid load function with valid path', function() { async ctx => {
        expect(db).to.eql(Promise.resolve())
        }
    })

    // test save function
    fileStorage.save(db, "/Users/stiwari/.local/share/@oclif/plugin-alias/alias/data.json")
    it('check for valid save function with valid path', function() { async ctx => {
        
        }
    })

    // test load function with invalid path
    db = fileStorage.load("/Users/stiwari/.local/share/@oclif/plugin-alias/alias/datas.json");
    it('check for valid load function with invalid path', function() { async ctx => {
        expect(db).to.eql(Promise.resolve())
        }
    })
    
});