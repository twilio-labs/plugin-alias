# @twilio-labs/plugin-alias

<!-- [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Kavya-24_plugin-alias&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Kavya-24_plugin-alias) -->

[![NPM](https://nodei.co/npm/@twilio-labs/plugin-alias.svg)](https://nodei.co/npm/@twilio-labs/plugin-alias/)

[![NPM](https://img.shields.io/npm/v/@twilio-labs/plugin-alias.svg?label=@twilio-labs/plugin-alias)](https://www.npmjs.com/package/@twilio-labs/plugin-alias) [![Version](https://img.shields.io/npm/v/@twilio-labs/plugin-alias.svg)](https://npmjs.org/package/@twilio-labs/plugin-alias) [![Downloads/week](https://img.shields.io/npm/dw/@twilio-labs/plugin-alias.svg)](https://npmjs.org/package/@twilio-labs/plugin-alias) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://raw.githubusercontent.com/twilio-labs/plugin-alias/main/LICENSE) [![Node.js CI build-test](https://github.com/twilio-labs/plugin-alias/actions/workflows/build-test.yml/badge.svg)](https://github.com/twilio-labs/plugin-alias/actions/workflows/build-test.yml)

Access, store and use your favorite aliases for CLI commands with this plugin. It supports all the CLIs which are built over OCLIF.
Supports OCLIF v1 and v2 both.

<!-- toc -->

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Commands](#commands)
- [Cleanup](#cleanup)
- [Troubleshooting](#troubleshooting)

<!-- tocstop -->

## Getting Started

### Install the Twilio Command Line Interface (Or use with any OCLIF CLI)

Via `npm` or `yarn`:

```sh-session
$ npm install -g twilio-cli
$ yarn global add twilio-cli
```

Via `homebrew`:

```sh-session
$ brew tap twilio/brew && brew install twilio
```

See the [Twilio CLI documentation](https://www.twilio.com/docs/twilio-cli/quickstart) for more information.

### Install the plugin for general use

The following step will install the plugin from [NPM](https://www.npmjs.com/package/plugin-alias) and is recommended if you are interested in trying out the [commands](#commands) in the latest release.

For Twilio CLI:
```sh-session
$ twilio plugins:install @twilio-labs/plugin-alias
```

For Other OCLIF CLI, say oclif-example:
```sh-session
$ oclif-example plugins:install @twilio-labs/plugin-alias
```

### Install the plugin for local development

The following step will install the plugin from a local directory. Use this option if you are interested in modifying the plugin and testing it out from the Twilio CLI. 

For Twilio CLI:
```sh-session
$ twilio plugins:link /path/to/plugin-alias
```

For Other OCLIF CLI, say oclif-example:
```sh-session
$ oclif-example plugins:link /path/to/plugin-alias
```

Prerequisites: Cloned repository locally

### Setup the local alias directory
The following step will create a directory named "alias" in the local data directory of the user. Use this command before running any other alias command to setup the necessary directory structure.

For Twilio CLI:
```sh-session
$ twilio alias:setup
```

For Other OCLIF CLI, say oclif-example:
```sh-session
$ oclif-example alias:setup
```

# Usage

Here we have shown the usage with Twilio CLI. If you are using some other CLI, change "twilio" with your CLI Name, say "oclif-example".

```sh-session
$ twilio --help alias
USAGE
  $ twilio alias
...
```

# Commands
<!-- commands -->
* [`twilio alias:setup`](#twilio-aliassetup)
* [`twilio alias:add`](#twilio-aliasadd)
* [`twilio alias:delete`](#twilio-aliasdelete)
* [`twilio alias:use`](#twilio-aliasuse)
* [`twilio alias:list`](#twilio-aliaslist)
* [`twilio alias:import`](#twilio-aliasimport)
* [`twilio alias:export`](#twilio-aliasexport)
* [`twilio alias:reset`](#twilio-aliasreset)

<!-- Setup Command -->

## `twilio alias:setup`

Setup local directory for storing aliases

```
USAGE
  $ twilio alias:setup

EXAMPLE
  $ twilio alias:setup
  Setup complete
```

_See code: [src/commands/alias/setup.js](https://github.com/twilio-labs/plugin-alias/tree/main/src/commands/alias/setup.js)_
<br>

<!-- Add Command -->

## `twilio alias:add`

Create a new alias to access Twilio CLI commands

```
USAGE
  $ twilio alias:add [name] [command]

ARGUMENTS
  name  				   Name of the alias shorthand
  command            			   Command to shorthand

OPTIONS
  -f, --force           		   Overwrite already present alias

EXAMPLE
  $ twilio alias:add plist profiles:list
  Successfully created alias plist for profiles:list
```

Note: Even if the CLI being used has a space topic separator, the commands must be added with colon as the topic separator only. 
_See code: [src/commands/alias/add.js](https://github.com/twilio-labs/plugin-alias/tree/main/src/commands/alias/add.js)_

<!-- Delete Command -->

## `twilio alias:delete`

Delete an alias
```
USAGE
  $ twilio alias:delete [name]

ARGUMENTS
  name  				   Name of the alias shorthand

EXAMPLE
  $ twilio alias:delete plist
  Successfully deleted alias plist
```


```
USAGE
  $ twilio alias:delete [non-existing_alias_name]

ARGUMENTS
  name  				   Name of the alias shorthand

EXAMPLE
  $ twilio alias:delete pli
  Did you mean? 
  >plist
  proList
  Continue without deleting 
```

_See code: [src/commands/alias/delete.js](https://github.com/twilio-labs/plugin-alias/tree/main/src/commands/alias/delete.js)_


<!-- Use Command -->

## `twilio alias:use`
Use an alias for a Twilio CLI command

```
USAGE
  $ twilio alias:use [name]

ALIAS
  $ twilio use [name]

ARGUMENTS
  name  				   Name of the alias shorthand

EXAMPLE
  $ twilio alias:use plist
  Using the command profiles:list from alias plist
  <Output of profiles:list>
```


```
USAGE
  $ twilio alias:use [non-existing_alias_name]

ARGUMENTS
  name  				   Name of the alias shorthand

EXAMPLE
  $ twilio alias:use pli
  Did you mean? 
  >plist
  proList
  Continue without using 
```

The command `alias:use` is inherently statically aliased for further simplicity
```
EXAMPLE
  $ twilio use plist                        //Works for only CLIs without any topic separators set
  <Output>
  
  $ twilio :use plist                       //Works for all CLIs without any dependency on the topic separators
  <Output>
```

Note: For CLIs built over oclif, the topics can be separated by either ':' or ' '. [See More](https://oclif.io/docs/topic_separator). Support present in oclif v2, will be fixed in future releases

_See code: [src/commands/alias/use.js](https://github.com/twilio-labs/plugin-alias/tree/main/src/commands/alias/use.js)_

<!-- List Command -->

## `twilio alias:list`

View the aliases

```
USAGE
  $ twilio alias:list

EXAMPLE
  $ twilio alias:list
  List of the stored aliases

  <Lists all the aliases stored>
```

_See code: [src/commands/alias/list.js](https://github.com/twilio-labs/plugin-alias/tree/main/src/commands/alias/list.js)_

<!-- Import Command -->

## `twilio alias:import`

Import aliases from a file
```
USAGE
  $ twilio alias:import [filepath]

ARGUMENTS
  filepath  				   Path of the alias file

EXAMPLE
  $ twilio alias:import ./aliasfile.json
  Successfully imported aliases from file ./aliasfile.json
```

_See code: [src/commands/alias/import.js](https://github.com/twilio-labs/plugin-alias/tree/main/src/commands/alias/import.js)_
<br>

<!-- Export Command -->

## `twilio alias:export`

Export the aliases

```
USAGE
  $ twilio alias:export [filepath](optional)
  
ARGUMENTS
  filepath  				   Path of the alias file

EXAMPLE
  $ twilio alias:export ./abc.json
  Successfully exported aliases to file ./abc.json
```

The command exports to a default path if path is not specified.
```
EXAMPLE
  $ twilio alias:export
  Exporting to default path ...
  Successfully exported aliases to file ./dataexport.json
```

_See code: [src/commands/alias/export.js](https://github.com/twilio-labs/plugin-alias/tree/main/src/commands/alias/export.js)_


<!-- Reset Command -->

## `twilio alias:reset`

Reset the aliases and directory. Used for cleanup. Recommended to run before uninstalling the plugin. Not visible in --help

```
USAGE
  $ twilio alias:reset

EXAMPLE
  $ twilio alias:reset
  reset complete
```
_See code: [src/commands/alias/reset.js](https://github.com/twilio-labs/plugin-alias/tree/main/src/commands/alias/reset.js)_


<!-- commandsstop -->


# Cleanup
<!-- cleanup -->
If you want to update or uninstall the plugin, then we recommend that before proceeding towards uninstalling please do the cleanup of local directory by the following command:

```sh-session
$ twilio alias:reset
```

To update the plugin, you can uninstall the older version and install the new version from npm.

To uninstall the plugin use the command:

For Twilio CLI:
```sh-session
$ twilio plugins:uninstall @twilio-labs/plugin-alias
```

If you have linked the plugin locally for development, you can unlink it with the command:

For Twilio CLI:
```sh-session
$ twilio plugins:unlink /path/to/plugin-alias
```

# Troubleshooting
<!-- troubleshooting -->

If you run into some issue while using the plugin, refer the help section by using the command with the flag --help 
```
  $ twilio [COMMAND] --help
```
If facing bugs or issues, checkout the [Issues](https://github.com/twilio-labs/plugin-alias/issues) to check if this issue already exists. If it does not exists, then create a new one.
