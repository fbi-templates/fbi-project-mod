# fbi-project-mod
Node services or node module.

> This is a fbi project template. If you haven't installed [fbi](https://github.com/AlloyTeam/fbi) yet, use the following command to install.
>
> `$ npm i -g fbi` or `yarn global add fbi`
## Requirements
- `fbi v3.0+`
- `node v7.6+`

## Usage

**Create a project**

```bash
$ cd path/to/workspace
$ fbi init https://github.com/fbi-templates/fbi-project-mod.git new-project  
```

or

```bash
$ fbi add https://github.com/fbi-templates/fbi-project-mod.git
$ cd path/to/empty-folder
$ fbi init mod
```

**Show available tasks**
```bash
$ fbi ls
```

**Run a task**
```bash
$ fbi <task> [params]
```

## Tasks

### `serve`
- Description: Compile and start development server.
- Params: none
- Alias: `s`
- Examples:
  - `fbi s`

### `build`
- Description: Build the project for the specified environment.
- Params:
  - `p/prod` `{Boolean}` (default) Production environment.
  - `t/test` `{Boolean}` Test environment.
- Alias: `b`
- Examples:
  - `fbi b -t`
  - `fbi b --t`
  - `fbi b -t=true`
  - `fbi b --test=true`
  - `fbi b -p`
  - `fbi b --p`
  - `fbi b -p=true`
  - `fbi b --prod=true`

## Test
```bash
$ curl -i http://localhost:3000/api/demo
```
## Startup project
```bash
$ npm run dev
# or
$ npm run test
# or
$ npm run prod
```
## More
- [Official templates](https://github.com/fbi-templates)
- [fbi documentation](https://neikvon.gitbooks.io/fbi/content/)
- Migrate from [fbi-template-mod](https://github.com/neikvon/fbi-template-mod)? Check [this](https://github.com/fbi-templates/fbi-task-migrate) out.

## Changelog

- **2.0.0** (2017.12.07)
  - Improvements: build performance, use of configuration