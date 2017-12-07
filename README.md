# fbi-project-mod
Node services or node module.

> This is a fbi project template. If you haven't installed [fbi](https://github.com/AlloyTeam/fbi) yet, use the following command to install.
>
> `$ npm i -g fbi`
## Requirements
- `fbi v3.0+`
- `node v7.6+`

## Usage
```bash
$ cd path/to/workspace
$ fbi init https://github.com/fbi-templates/fbi-project-mod.git new-project  
$ fbi s                      
```

or

```bash
$ fbi add https://github.com/fbi-templates/fbi-project-mod.git
$ cd path/to/workspace
$ fbi init mod mod-project
$ fbi ls 
$ fbi <task> [params]
```

## Run a task
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
  - `fbi b -t` or `fbi b --t` or `fbi b -t=true` or `fbi b --test=true`
  - `fbi b -p` or `fbi b --p` or `fbi b -p=true` or `fbi b --prod=true`

<!-- ## Peel off from fbi -->
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
- [fbi full documentation](https://neikvon.gitbooks.io/fbi/content/)

## Changelog

- 2017.12.07  (`2.0.0`)
1. Improvements: build performance, use of configuration