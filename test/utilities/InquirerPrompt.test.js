const assert = require('chai').assert;
const { expect, test } = require('@oclif/test')
const FilesystemStorage = require('../../src/utilities/FileSnapshot/FilesystemStorage')
const ContextUtil = require('../../src/utilities/ContextUtility')
const InquirerPrompts = require('../../src/utilities/InquirerPrompts')
const FileUtil = require('../../src/utilities/FileUtility')
const fs = require('fs');



describe('Tests for Inquirer Prompts', () => {

    let prompt = new InquirerPrompts();
    
    it('Check suggestions function', function(){
        assert.isArray(prompt.constructSuggestions("he", {hello: "world", hello2: "world2"}));
        assert.isTrue(prompt.constructSuggestions("he", {hello: "world", hello2: "world2"}).length === 2);
        
    })

})
