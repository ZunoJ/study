const axios = require('axios')
const inquirer = require('inquirer')
const { gitRepos } = require('./mock.js')
function simulateRequest() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(gitRepos)
    }, 1000)
  })
}
function getRepos() {
  // return axios.get('https://api.github.com/orgs/zunoJs/repos')  // 真实请求
  return simulateRequest() // 模拟请求
}
async function getRepoInfo() {
  let repos = await getRepos()
  repos = repos.map((item) => item.name)
  let { repo } = await inquirer.prompt([
    {
      name: 'repo',
      type: 'list',
      message: 'please choose a template',
      choices: repos,
    },
  ])
  console.log('用户选择了----', repo)
  return repo
}
module.exports = {
  getRepoInfo,
}
