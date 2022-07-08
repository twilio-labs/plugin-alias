# @twilio-labs/plugin-alias

<!-- [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Kavya-24_plugin-alias&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Kavya-24_plugin-alias) -->

Access, store and use your favorite aliases for twilio commands with this plugin 

<!-- toc -->

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Commands](#commands)
- [Help](#help)

<!-- tocstop -->

## Getting Started

### Install the Twilio Command Line Interface ( Or any other CLI Tool built over oclif)

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

```sh-session
$ twilio plugins:install plugin-alias
```

### Install the plugin for local development

The following step will install the plugin from a local directory. Use this option if you are interested in modifying the plugin and testing it out from the Twilio CLI. 

```sh-session
$ twilio plugins:link /path/to/plugin-alias
```

Prerequisites: Cloned repository locally

### Setup the local alias directory
The following step will create a directory named "alias" in the local data directory of the user. Use this command before running any other alias command to setup the necessary directory structure.

```sh-session
$ twilio alias:setup
```

# Usage

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
  plist
  proList
  >Continue without deleting 
```

Note: Changes made after v1.1 prompt the user for inquirer when the input (alias_name) does not exist. Uses Jaro-winkler for returning best 3 matches

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
  plist
  proList
  >Continue without using 
```

Note: Changes made after v1.1 prompt the user for inquirer when the input (alias_name) does not exist. Uses Jaro-winkler for returning best 3 matches


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
  $ twilio alias:export

EXAMPLE
  $ twilio alias:export
  Successfully exported aliases to file ./dataexport.json
```
_See code: [src/commands/alias/export.js](https://github.com/twilio-labs/plugin-alias/tree/main/src/commands/alias/export.js)_


<!-- Reset Command -->

## `twilio alias:reset`

Reset the aliases and directory. Used for cleanup. Not visible in --help

```
USAGE
  $ twilio alias:reset

EXAMPLE
  $ twilio alias:reset
  reset complete
```
_See code: [src/commands/alias/reset.js](https://github.com/twilio-labs/plugin-alias/tree/main/src/commands/alias/reset.js)_


<!-- commandsstop -->



# Help
<!-- help -->

Run the commands with --help
```
  $ twilio [COMMAND] --help
```

If facing bugs or issues, checkout [Issues](https://github.com/twilio-labs/plugin-alias/issues) and create one

