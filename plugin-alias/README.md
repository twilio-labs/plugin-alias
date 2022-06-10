# @twilio/plugin-alias

Access, store and use your favorite Twilio aliases with this plugin

<!-- toc -->

- [Usage](#usage)

- [Commands](#commands)

<!-- tocstop -->

# Setup

Link plugin to the CLI

Run `twilio alias:Setup`

# Usage

```sh-session
$ twilio --help alias
$ twilio alias
```

# Commands

<!-- commands -->

- [`twilio alias:Setup`](#twilio-aliasSetup)

- [`twilio alias:Add`](#twilio-aliasAdd)

- [`twilio alias:Delete`](#twilio-aliasDelete)

- [`twilio alias:Use`](#twilio-aliasUse)

- [`twilio alias:List`](#twilio-aliasList)

  <br>
<!-- Setup Command -->

## `twilio alias:Setup`

Setup aliases plugin

```
USAGE
	$ twilio alias:Setup

DESCRIPTION
	This command is used to run Setup
```

_See code: [src/commands/alias/Setup.js](https://github.com/Kavya-24/cli-plugin/tree/main/plugin-alias/src/commands/alias/Setup.js)_
<br>

<!-- Add Command -->

## `twilio alias:Add`

Add aliases

```
USAGE
	$ twilio alias:Add


ARGUMENTS
	name : Name of the alias shorthand
	command : Command we want to shorthand


FLAGS
	-f : Flag for overwriting


DESCRIPTION
	This command is used to add favorite aliases
```

_See code: [src/commands/alias/Add.js](https://github.com/Kavya-24/cli-plugin/tree/main/plugin-alias/src/commands/alias/Add.js)_

  <br>

<!-- Delete Command -->

## `twilio alias:Delete`

Delete aliases

```
USAGE
	$ twilio alias:Delete


ARGUMENTS
	name : Name of the alias shorthand


DESCRIPTION
	This command is used to delete favorite aliases
```

_See code: [src/commands/alias/Delete.js](https://gitshub.com/Kavya-24/cli-plugin/tree/main/plugin-alias/src/commands/alias/Delete.js)_

  <br>
  
<!-- Use Command -->
## `twilio alias:Use`
Use aliases

```
USAGE
	$ twilio alias:Use


ARGUMENTS
	name : Name of the alias shorthand to use

DESCRIPTION
	This command is used to use an alias shorthand
```

_See code: [src/commands/alias/Use.js](https://github.com/Kavya-24/cli-plugin/tree/main/plugin-alias/src/commands/alias/Use.js)_

<br>

<!-- List Command -->

## `twilio alias:List`

List aliases

```
USAGE
	$ twilio alias:List


DESCRIPTION
	This command is used to list all the aliases
```

_See code: [src/commands/alias/List.js](https://github.com/Kavya-24/cli-plugin/tree/main/plugin-alias/src/commands/alias/List.js)_

<!-- commandsstop -->
