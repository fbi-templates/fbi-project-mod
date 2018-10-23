# fbi-project-mod (graphql)

Node service or application template base on Koa 2.

> This is a fbi project template. If you haven't installed
> [fbi](https://github.com/AlloyTeam/fbi) yet, use the following command to
> install.
>
> `$ npm i -g fbi` or `yarn global add fbi`

## Requirements

- **`fbi v3.2.0+`**
  > `fbi v3.2.0+` support branch version. [more](https://github.com/AlloyTeam/fbi/blob/master/CHANGELOG.md#320-2018-10-22)
- `node v8.2.1+`

## Features

- TSLint
- ES modules
- Environment data config
- Local development server using [nodemon](https://github.com/remy/nodemon)
- Debug in VSCode

## Usage

1. **Add template**

   ```bash
   $ fbi add https://github.com/fbi-templates/fbi-project-mod.git
   ```

1. **Create a project**

   ```bash
   $ fbi init -o mod@graphql [target-folder]
   ```

1. **Show available tasks**

   ```bash
   $ fbi ls
   ```

1. **Run a task**

   ```bash
   $ fbi s   # Start dev server
   $ fbi b   # Build the project for the specified environment
   ```

1. **Debug in VSCode**

   ```bash
   # 1. Start dev server
   $ fbi s

   # 2. Attach existing process:
   Press `F5` in VSCode (support breakpoints in `src`)
   ```

- **Update template**

  ```bash
  $ fbi up mod
  ```

- **Update options**

  ```bash
  $ cd path/to/my-app
  $ fbi init -o
  ```

## Run the project in a production environment

```bash
$ npm start
```

## Tasks

### `serve`

- Description: Compile and start development server.
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
  - `fbi b -p`

## Need file packaging?

check out [fbi-task-pack](https://github.com/fbi-templates/fbi-task-pack)

## More

- [Official templates](https://github.com/fbi-templates)
- [fbi documentation](https://neikvon.gitbooks.io/fbi/content/)
- Migrate from [fbi-template-mod](https://github.com/neikvon/fbi-template-mod)?
  Check [this](https://github.com/fbi-templates/fbi-task-migrate) out.

## License

[MIT](https://opensource.org/licenses/MIT)

## [Changelog](./CHANGELOG.md)
