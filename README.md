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
$ twilio plugins:install @twilio-labs/plugin-rtc
```

### Install the plugin for local development

The following step will install the plugin from a local directory. Use this option if you are interested in modifying the plugin and testing it out from the Twilio CLI.

```sh-session
$ twilio plugins:link /path/to/plugin-alias
```

# Setup

1. Link the plugin to your CLI 
2. Run `oclif-example alias:Setup`

# Usage

```sh-session
$ oclif-example --help alias
$ oclif-example alias
```

# Commands

<!-- commands -->

- [`oclif-example alias:Setup`](#oclif-example-aliasSetup)

- [`oclif-example alias:Add`](#oclif-example-aliasAdd)

- [`oclif-example alias:Delete`](#oclif-example-aliasDelete)

- [`oclif-example alias:Use`](#oclif-example-aliasUse)

- [`oclif-example alias:List`](#oclif-example-aliasList)

- [`oclif-example alias:Import`](#oclif-example-aliasImport)

- [`oclif-example alias:Export`](#oclif-example-aliasExport)

  <br>
<!-- Setup Command -->

## `oclif-example alias:Setup`

Setup aliases plugin

```
USAGE
	$ oclif-example alias:Setup

DESCRIPTION
	This command is used to run Setup
```

_See code: [src/commands/alias/Setup.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/Setup.js)_
<br>

<!-- Add Command -->

## `oclif-example alias:Add`

Add aliases

```
USAGE
	$ oclif-example alias:Add


ARGUMENTS
	name : Name of the alias shorthand
	command : Command we want to shorthand


FLAGS
	-f : Flag for overwriting


DESCRIPTION
	This command is used to add favorite aliases
```

_See code: [src/commands/alias/Add.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/Add.js)_

  <br>

<!-- Delete Command -->

## `oclif-example alias:Delete`

Delete aliases

```
USAGE
	$ oclif-example alias:Delete


ARGUMENTS
	name : Name of the alias shorthand


DESCRIPTION
	This command is used to delete favorite aliases
```

_See code: [src/commands/alias/Delete.js](https://gitshub.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/Delete.js)_

  <br>
  
<!-- Use Command -->
## `oclif-example alias:Use`
Use aliases

```
USAGE
	$ oclif-example alias:Use


ARGUMENTS
	name : Name of the alias shorthand to use

DESCRIPTION
	This command is used to use an alias shorthand
```

_See code: [src/commands/alias/Use.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/Use.js)_

<br>

<!-- List Command -->

## `oclif-example alias:List`

List aliases

```
USAGE
	$ oclif-example alias:List


DESCRIPTION
	This command is used to list all the aliases
```

_See code: [src/commands/alias/List.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/List.js)_

<!-- Import Command -->

## `oclif-example alias:Import`

Import an alias file

```
USAGE
	$ oclif-example alias:Import

DESCRIPTION
	This command is used to import an alias file
```

_See code: [src/commands/alias/Import.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/Import.js)_
<br>

<!-- Export Command -->

## `oclif-example alias:Export`

Export the aliases

```
USAGE
	$ oclif-example alias:Export

DESCRIPTION
	This command is used to export aliases
```

_See code: [src/commands/alias/Export.js](https://github.com/Kavya-24/plugin-alias/tree/main/src/commands/alias/Export.js)_
<br>

<!-- commandsstop -->
