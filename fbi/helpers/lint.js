const { Linter, Configuration } = require('tslint')

module.exports = async () => {
  const configurationFilename = 'tslint.json'
  const options = {
    fix: false,
    formatter: 'stylish',
    rulesDirectory: process.cwd() + '/'
  }

  const program = Linter.createProgram('tsconfig.json', process.cwd() + '/')
  const linter = new Linter(options, program)

  const files = Linter.getFileNames(program)
  for (let file of files) {
    const fileContents = program.getSourceFile(file).getFullText()
    const configuration = Configuration.findConfiguration(
      configurationFilename,
      file
    ).results

    linter.lint(file, fileContents, configuration)
  }

  const results = linter.getResult()
  if (results.output.trim()) {
    console.log(results.output)
  }
}
