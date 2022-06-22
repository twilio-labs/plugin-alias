
class getAliasFilePath {
  constructor(initialData = "") {
    this.data = initialData;
  }

  path(config) {
    const dataDirectory = config.dataDir;
    const aliasFolderName = 'alias';
    const aliasFolderPath = dataDirectory;
    const aliasFileName = 'plugin-alias-data.json';
    const aliasFilePath = aliasFolderPath + '/' + aliasFileName;
    return aliasFilePath;
  }

}

module.exports = getAliasFilePath
