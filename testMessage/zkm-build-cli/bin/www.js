#! /usr/bin/env node

// enter
const commander = require('commander')
// 解析用户执行时输入的参数
// process.argv 是 nodejs 提供的属性
// npm run server --port 3000
// 后面的 --port 3000 就是用户输入的参数
commander.name('my-build-cli').usage(`<command> [option]`).version(`1.0.0`)
commander // 创建create 命令，用户可以通过 my-cli creat appName 来创建项目
  .command('create <app-name>')
  // 命名的描述
  .description('create a new project')
  // create命令的选项
  .option('-f, --force', 'overwrite target if it exist')
  .option('-s, --sb', 'you is sb')
  .action((name, options) => {
    // 执行'./create.js'，传入项目名称和 用户选项
    require('./create')(name, options)
  })
commander.on('--help', function () {
  // 监听
  console.log('asgasgsa')
})
commander.parse()

const options = commander.opts() //获取配置参数对象
