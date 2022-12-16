const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const Generator = require('./generator')
const { getRepoInfo } = require('./http')
module.exports = async function (name, option) {
  const cwd = process.cwd()
  // process.cwd()获取当前的工作目录
  const targetAir = path.resolve(cwd, name)
  // 生成最终文件的目录
  if (fs.existsSync(targetAir)) {
    //判断是否已有该文件
    if (option.force) {
      // 用户通过--force参数强制删除
      await fs.remove(targetAir)
    } else {
      // 询问用户是否删除已有文件
      let { action } = await inquirer.propmt([
        {
          name: 'action',
          type: 'list',
          message: 'Target already exists',
          choices: [
            {
              name: 'overwrite',
              value: 'overwrite',
            },
            {
              name: 'cancel',
              value: false,
            },
          ],
        },
      ])
      if (!action) {
        // 用户不同意删除，停止工作
        return
      } else {
        // 用户同意删除，删除文件夹
        await fs.remove(targetAir)
      }
    }
  }
  // 获取询问配置项
  const args = require('./ask')

  // 通过inquirer，让用户输入的项目内容：作者和描述
  const ask = await inquirer.prompt(args)
  let selectRepo = await getRepoInfo()
  let generator = new Generator(name, targetAir, ask, selectRepo)
  generator.create()
}
