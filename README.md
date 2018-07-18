# fbi-project-mod

Node service or application template base on Koa 2.

> This is a fbi project template. If you haven't installed [fbi](https://github.com/AlloyTeam/fbi) yet, use the following command to install.
>
> `$ npm i -g fbi` or `yarn global add fbi`

## Requirements

- `fbi v3.0+`
- `node v7.6+`

## Features

- ESLint
- ES modules
- Environment data config
- Local development server using [nodemon](https://github.com/remy/nodemon)
- Debug in VSCode

## Usage

**Add template**

```bash
$ fbi add https://github.com/fbi-templates/fbi-project-mod.git
```

**Create a project**

```bash
$ cd path/to/empty-folder
$ fbi init -o mod

# or
$ fbi init -o mod my-app
```

**Show available tasks**

```bash
$ fbi ls
```

**Run a task**

```bash
$ fbi <task> [params]
```

**Update template**

```bash
$ fbi up mod
```

## Tasks

### `serve`

- Description: Compile and start development server.
- Params:
  - `d` `{Boolean}` 'watch only' mode.
- Alias: `s`
- Examples:
  - `fbi s`
  - `fbi s -d`

### `build`

- Description: Build the project for the specified environment.
- Params:
  - `p/prod` `{Boolean}` (default) Production environment.
  - `t/test` `{Boolean}` Test environment.
- Alias: `b`
- Examples:
  - `fbi b -t`
  - `fbi b -p`

## Test

```bash
$ curl -i http://localhost:3000/api/demo
```

## Debug in VSCode

```bash
# steps:

# 1. start dev server in `watchOnly` mode
$ fbi s -d

# 2. make sure you have configured `.vscode/launch.json`

# 3. start debug server: Press `F5` in VSCode (support breakpoints in `src`)
```

> [VSCode: Launch configurations](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations)
>
> [VSCode: Debug actions](https://code.visualstudio.com/docs/editor/debugging#_debug-actions)

## Startup project

```bash
$ npm start
```

## Need file packaging?
check out [fbi-task-pack](https://github.com/fbi-templates/fbi-task-pack)


## More

- [Official templates](https://github.com/fbi-templates)
- [fbi documentation](https://neikvon.gitbooks.io/fbi/content/)
- Migrate from [fbi-template-mod](https://github.com/neikvon/fbi-template-mod)? Check [this](https://github.com/fbi-templates/fbi-task-migrate) out.

## License

[MIT](https://opensource.org/licenses/MIT)

## [Changelog](./CHANGELOG.md)
