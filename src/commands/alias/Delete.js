const os = require('os');
const { args, flags } = require('@oclif/command');
const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
const findAlias = require('../../utilities/findAlias')
const insertInFile = require('../../utilities/insertInFile')
const AliasObject = require('../../utilities/AliasObject')
const fs = require('fs');


class Delete extends AliasBaseCommand {

  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    await super.run();

    const { args } = this.parse(Delete)

    if (this.validateArguments(args)) {

      const userAlias = args["name"];
      const aliasFilePath = this.getAliasFilePath()["aliasFilePath"];

      if (fs.existsSync(aliasFilePath)) {
        this.removeAlias(userAlias, aliasFilePath);
      }

      else {
        console.log('please run alias: setup command first to initiate the plugin setup')
      }
    }

  }

  removeAlias(userAlias, aliasFilePath) {

    //We have valid arguments and the aliasFilePath exists
    const file_data = fs.readFileSync(aliasFilePath, 'utf-8');

    try {

      const json_data = JSON.parse(file_data);
      const exist_util = findAlias(userAlias, json_data);
      const alias_exists = exist_util["exist"];
      const alias_at = exist_util["index"];


      if (!alias_exists) {
        console.log('alias does not exist');
      }

      else {
        // at index = alias_At, remove 1 entry
        json_data["aliases"].splice(alias_at, 1);
      }

      insertInFile(aliasFilePath, json_data);

    } catch (err) {
      console.log(err);
      console.log('unable to parse');
    }
  }


  validateArguments(args) {

    var isValid = true;
    var userAlias = '';

    try {
      userAlias = args["name"];
    } catch (err) {
      console.log(err);

    }

    if (userAlias == undefined) {
      console.log('Please insert an alias argument to delete');
      isValid = false;
    }

    return isValid;

  }

}

Delete.description = 'delete an alias';

Delete.args = [
  {
    name: 'name',
    description: 'alias name to delete',
  }
];

module.exports = Delete;
