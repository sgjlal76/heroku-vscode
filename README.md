# Heroku Tooling for VS Code

An attempt to provide proper Heroku tooling for VS Code

## Features

### Commands

- `Heroku: Configure Application` allows you to set a default application name per workspace.
- `Heroku: Push Container`, pushes the **web** container
- `Heroku: Release Container`, releases the **web** container
- `Heroku: Deploy Container`, shorthand to both push AND release the **web** container
- `Heroku: Open`, opens the app

## Known Issues

Still WIP. Probably many,

## TODO

## For sure

- Tail logs
- Search recursively until the first Dockerfile is found. This should avoid
  failing in projects which are in nested directories
- Enable deployments via push to `heroku master`
- Open Heroku admin panel
- Login to Heroku
- Install CLI

### Maybe

- Detect if the project has a Procfile, or it's _Dockerised_, and release accordingly.
