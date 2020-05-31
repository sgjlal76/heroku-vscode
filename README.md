# Heroku Tooling for VS Code

An attempt to provide proper Heroku tooling for VS Code.

## What is this and why?

TLDR: adds VSC commands to make working with containerised apps a breeze. It
also takes care of Heroku CLI installation/login to remove friction.

This extension **does not** attempt to replace the Heroku CLI for interacting
with Heroku. It is a top-notch CLI and for most things it makes sense to use
it.

What this extension **does** attempt is to wrap the most relevant commands
from the CLI in my development workflow to VS Code commands in order to
embrace the _idiomatic_ way of working in VS Code.

## Features

Before being able to run any of the relevant commands, the Heroku CLI must be
installed and an session authorised. You can do this via the command `Heroku:
Setup`.

**Note:** If you run Windows, please make sure to install the CLI separately,
the Setup command won't work. You can find the installer [here][0].

### Commands

- `Heroku: Setup`, Download and installs the Heroku CLI, and prompts to log in.
- `Heroku: Configure Application` allows you to set a default application name per workspace.
- `Heroku: Push Container`, pushes the **web** container.
- `Heroku: Release Container`, releases the **web** container.
- `Heroku: Deploy Container`, shorthand to both push AND release the **web** container.
- `Heroku: Open`, opens the app.
- `Heroku: Logs`, tails the logs in a new terminal.

## Known Issues

Probably many. Log an issue in the repository, let's fix it together :)

## TODO

- Support `Procfile` projects
- Allow user to configure `Dockerfile` to deploy if its not in the root directory

[0]: https://devcenter.heroku.com/articles/heroku-cli#download-and-install