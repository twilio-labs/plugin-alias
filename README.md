# @twilio-labs/plugin-alias

Access, store and use your favorite twilio aliases with this plugin

<!-- toc -->

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Commands](#commands)

<!-- tocstop -->

## Getting Started

### Install the Twilio CLI

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

The following step will install the plugin from [NPM](https://www.npmjs.com/package/@twilio-labs/plugin-alias) and is recommended if you are interested in trying out the [commands](#commands) in the latest release.

```sh-session
$ twilio plugins:install @twilio-labs/plugin-alias
```

### Install the plugin for local development

The following step will install the plugin from a local directory. Use this option if you are interested in modifying the plugin and testing it out from the Twilio CLI.

```sh-session
$ twilio plugins:link /path/to/plugin-alias
```

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

_See code: [src/commands/alias/setup.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/setup.js)_
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

_See code: [src/commands/alias/add.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/add.js)_

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

_See code: [src/commands/alias/delete.js](https://gitshub.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/delete.js)_

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

_See code: [src/commands/alias/use.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/use.js)_

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

_See code: [src/commands/alias/list.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/list.js)_

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

_See code: [src/commands/alias/import.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/import.js)_
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
_See code: [src/commands/alias/export.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/export.js)_

<!-- commandsstop -->
