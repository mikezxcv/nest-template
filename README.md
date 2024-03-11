<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

Once the dependencies are installed, you can now configure your project by creating a new `.env` file containing the environment variables used for development.

```bash
cp .env.example .env
```

For a standard development configuration, you can leave the default values for `HOST`, `BASE_PATH` and `PORT` under the `API REST` section.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Using Eslint

```bash
# Lint the project files using TSLint
npm run lint
```

## Colaboration

This project follows the GitFlow branching model. Ensure your contributions adhere to this standard.

If you wish to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/feature-name).
3. Make your changes and commit them (git commit -am 'Add new feature').
4. Push your changes to your fork (git push origin feature/feature-name).
5. Check to run the comand npm run lint to improve code quality before add your new feature.
6. Create a new pull request to develop branch.

## Project Structure

The project estructure follows the next convention for every modules under
modules folder and global folders to enable common global items

```bash

src
   |-- common # Common folder contains interfaces, common constants for dependencies inyections used on the whole application
   |   |-- interfaces
   |-- config # Contains configuration to relational and no-relational databases
   |   |-- database.config.ts
   |   |-- mongo.config.ts
   |-- modules
   |   |-- name_module
   |   |   |-- name_module.controller.ts
   |   |   |-- name_module.module.ts
   |   |   |-- dto # Contains Data Transfer Objects used in all the module
   |   |   |   |-- example.dto.ts
   |   |   |-- entities # Contains Entities defined with classes
   |   |   |   |-- example.entity.ts
   |   |   |-- services #Define here the services used for every module including services from external modules
   |   |   |   |-- example.service.ts
   |   |   |   |-- from_other_module.service.ts
tsconfig.build.json
tsconfig.json
```

## Stay in touch

- Author - Miguel Martinez

## License

Nest is [MIT licensed](LICENSE).
