// const { Hook } = require('@oclif/core')
// const findAlias = require('../../utilities/findAlias')
// const AliasBaseCommand = require('../../utilities/AliasBaseCommand');
// const fs = require('fs');

const not_found_hook = async function (opts) {

  console.log('Err: ' + opts.id);
  this.config.runHook("command_incomplete", opts);


}

module.exports = not_found_hook