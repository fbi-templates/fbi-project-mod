module.exports = {
  alias: {
    b: 'build',
    s: 'serve'
  },
  src: 'server/',
  dist: './server', // 生成目录路径
  rollup: {
    /**
     * 指定入口文件
     * 不指定: '' 或 false 或 null 或 0
     * 指定单个文件: 'src/index.js'
     * 指定多个文件: ['src/index.js', 'src/helpers/demo.js']
     */
    entry: '',
    /**
     * 模块输出方式
     * 可选值: 'amd', 'cjs', 'es', 'iife', 'umd'
     */
    format: 'cjs',
    /**
     * 模块名称 （用于UMD/IIFE情形）
     * 效果: var MyBundle = (function () {...
     */
    moduleName: 'myModule',
    /**
     * 模块ID（用于AMD/UMD情形）
     * 效果: define('my-bundle',...
     */
    moduleId: 'myModuleId',
    banner: `require('source-map-support').install();`,
    outro: '// this is outro',
    footer: '// this is footer',
    leaveAsyncAlone: true // 是否编译async await: true =>不编译；false=>编译
  }
}
