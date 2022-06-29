# @twilio-labs/plugin-alias

Access, store and use your favorite oclif-example aliases with this plugin

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

# Setup

1. Link the plugin to your CLI 
2. Run `oclif-example alias:setup`

# Usage

```sh-session
$ oclif-example --help alias
$ oclif-example alias
```

# Commands

<!-- commands -->

- [`oclif-example alias:setup`](#oclif-example-aliasSetup)

- [`oclif-example alias:add`](#oclif-example-aliasAdd)

- [`oclif-example alias:delete`](#oclif-example-aliasDelete)

- [`oclif-example alias:use`](#oclif-example-aliasUse)

- [`oclif-example alias:list`](#oclif-example-aliasList)

- [`oclif-example alias:import`](#oclif-example-aliasImport)

- [`oclif-example alias:export`](#oclif-example-aliasExport)

  <br>
<!-- Setup Command -->

## `oclif-example alias:setup`

Setup aliases plugin

```
USAGE
	$ oclif-example alias:setup

DESCRIPTION
	This command is used to run Setup
```

_See code: [src/commands/alias/setup.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/setup.js)_
<br>

<!-- Add Command -->

## `oclif-example alias:add`

Add aliases

```
USAGE
	$ oclif-example alias:add


ARGUMENTS
	name : Name of the alias shorthand
	command : Command we want to shorthand


FLAGS
	-f : Flag for overwriting


DESCRIPTION
	This command is used to add favorite aliases
```

_See code: [src/commands/alias/add.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/add.js)_

  <br>

<!-- Delete Command -->

## `oclif-example alias:delete`

Delete aliases

```
USAGE
	$ oclif-example alias:delete


ARGUMENTS
	name : Name of the alias shorthand


DESCRIPTION
	This command is used to delete favorite aliases
```

_See code: [src/commands/alias/delete.js](https://gitshub.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/delete.js)_

  <br>
  
<!-- Use Command -->
## `oclif-example alias:use`
Use aliases

```
USAGE
	$ oclif-example alias:use


ARGUMENTS
	name : Name of the alias shorthand to use

DESCRIPTION
	This command is used to use an alias shorthand
```

_See code: [src/commands/alias/use.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/use.js)_

<br>

<!-- List Command -->

## `oclif-example alias:list`

List aliases

```
USAGE
	$ oclif-example alias:list


DESCRIPTION
	This command is used to list all the aliases
```

_See code: [src/commands/alias/list.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/list.js)_

<!-- Import Command -->

## `oclif-example alias:import`

Import an alias file

```
USAGE
	$ oclif-example alias:import

DESCRIPTION
	This command is used to import an alias file
```

_See code: [src/commands/alias/import.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/import.js)_
<br>

<!-- Export Command -->

## `oclif-example alias:export`

Export the aliases

```
USAGE
	$ oclif-example alias:export

DESCRIPTION
	This command is used to export aliases
```

_See code: [src/commands/alias/export.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/export.js)_
<br>

<!-- commandsstop -->
