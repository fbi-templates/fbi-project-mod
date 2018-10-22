const path = require('path')
const tsconfig = require('../configs/tsconfig')
const lint = require('../helpers/lint')

try {
  require('ts-node').register(tsconfig)

  lint()

  require(path.join(process.cwd(), 'src/index.ts'))
} catch (err) {
  console.log(err)
}
