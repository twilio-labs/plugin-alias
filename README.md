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
* [`twilio alias:setup`](#twilio-aliasSetup)
* [`twilio alias:add`](#twilio-aliasAdd)
* [`twilio alias:delete`](#twilio-aliasDelete)
* [`twilio alias:use`](#twilio-aliasUse)
* [`twilio alias:list`](#twilio-aliasList)
* [`twilio alias:import`](#twilio-aliasImport)
* [`twilio alias:export`](#twilio-aliasExport)

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
  $ twilio alias:add

ARGUMENTS
  name  						   Name of the alias shorthand
  command            			   Command to shorthand

OPTIONS
  -f, --force           			Overwrite already present alias

EXAMPLE
  $ twilio alias:add plist profiles:list
  Successfully created alias plist for profiles:list
```

_See code: [src/commands/alias/add.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/add.js)_

<!-- Delete Command -->

## `twilio alias:delete`

Delete aliases

```
USAGE
	$ twilio alias:delete


ARGUMENTS
	name : Name of the alias shorthand


DESCRIPTION
	This command is used to delete favorite aliases
```

_See code: [src/commands/alias/delete.js](https://gitshub.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/delete.js)_

  <br>
  
<!-- Use Command -->
## `twilio alias:use`
Use aliases

```
USAGE
	$ twilio alias:use


ARGUMENTS
	name : Name of the alias shorthand to use

DESCRIPTION
	This command is used to use an alias shorthand
```

_See code: [src/commands/alias/use.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/use.js)_

<br>

<!-- List Command -->

## `twilio alias:list`

List aliases

```
USAGE
	$ twilio alias:list


DESCRIPTION
	This command is used to list all the aliases
```

_See code: [src/commands/alias/list.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/list.js)_

<!-- Import Command -->

## `twilio alias:import`

Import an alias file

```
USAGE
	$ twilio alias:import

DESCRIPTION
	This command is used to import an alias file
```

_See code: [src/commands/alias/import.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/import.js)_
<br>

<!-- Export Command -->

## `twilio alias:export`

Export the aliases

```
USAGE
	$ twilio alias:export

DESCRIPTION
	This command is used to export aliases
```

_See code: [src/commands/alias/export.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/export.js)_
<br>

<!-- commandsstop -->
