# Contributing to Zora

This guide will help you setup the project locally
and start contributing to the repository.

## Prerequisites

- [Node.js](https://nodejs.org/en) version >=22
- [Turborepo](https://turbo.build/)
- [Pnpm package manager](https://pnpm.io/) version >=9.0.0

## Project architecture

![Project Architecture](https://raw.githubusercontent.com/biiswajit/assets/refs/heads/main/Screenshot%20from%202025-03-16%2022-51-34.png)

## Setup guide

For local setup follow this [setup guide](./SETUP.md)

## Before commit

### Check code formatting

This project uses prettier to maintain code formatting throughout the project, you can check the [rules](.prettierrc). Before making any commit to this codebase make sure you run

```sh
    pnpm format
```

command to reformat the file.

### Check code linting

This project uses eslint for code linting. Please make sure to run

```sh
    pnpm lint
```

to check for any linting issue.
