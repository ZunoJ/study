const path = require('path')
const fs = require('fs-extra')
const downloadGitRepo = require('download-git-repo')
const ora = require('ora')
const util = require('util')

async function wrapLoading(fn, message, ...args) {
  const loading = new ora(message)
  loading.start()
  fn(...args)
  try {
    const result = await fn(...args)
    // 下载成功
    loading.succeed()
    return result
  } catch (e) {
    // 下载失败
    loading.fail('Request failed ……')
  }
}
class generator {
  constructor(name, targetAir, ask, selectRepo) {
    this.name = name
    this.targetAir = targetAir
    this.ask = ask
    this.selectRepo = selectRepo
    // download-git-repo 默认不支持异步调用，需要使用util插件的util.promisify 进行转换
    this.downloadGitRepo = util.promisify(downloadGitRepo)
  }
  // 下载用户选择的项目模板
  async download(repo) {
    const requestUrl = `zunoJs/${repo}`
    await wrapLoading(
      this.downloadGitRepo,
      'waiting download template',
      requestUrl,
      path.resolve(process.cwd(), this.targetAir)
    )
  }
  async create() {
    // 下载模板
    await this.download(this.selectRepo)
    // 下载完成后，获取项目里的package.json
    // 将用户创建项目的填写的信息（项目名称、作者名字、描述），写入到package.json中
    let targetPath = path.resolve(process.cwd(), this.targetAir)

    let jsonPath = path.join(targetPath, 'package.json')

    if (fs.existsSync(jsonPath)) {
      // 读取已下载模板中package.json的内容
      const data = fs.readFileSync(jsonPath).toString()
      let json = JSON.parse(data)
      json.name = this.name
      // 让用户输入的内容 替换到 package.json中对应的字段
      Object.keys(this.ask).forEach((item) => {
        json[item] = this.ask[item]
      })

      //修改项目文件夹中 package.json 文件
      fs.writeFileSync(jsonPath, JSON.stringify(json, null, '\t'), 'utf-8')
    }
  }
}
module.exports = generator
