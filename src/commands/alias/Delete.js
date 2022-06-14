const { args, flags } = require('@oclif/command');
const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
const FileUtil = require('../../utilities/FileUtility.js');


class Delete extends AliasBaseCommand {

  constructor(argv, config) {
    super(argv, config);
  }

  async run() {
    await super.run();

    const { args } = this.parse(Delete)

    if (this.validateArguments(args)) {

      this.removeAlias(args["name"], '', false);
    }

  }

  removeAlias(userAlias, userCommand, hasFlag){
    const updateFile= new FileUtil(this).updateData(userAlias, userCommand, hasFlag, this.id);
    console.log(updateFile);
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

Delete.description = 'delete a twilio alias';
Delete.id = 'alias:Delete';


Delete.args = [

  {
    name: 'name',
    description: 'alias name to delete',
  }
];

module.exports = Delete;
