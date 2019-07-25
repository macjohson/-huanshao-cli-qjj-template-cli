const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

// 根目录
const rootDir = path.join(__dirname, "template");
// html模板根目录
const viewDir = path.join(rootDir, "view");
// 静态文件根目录
const staticDir = path.join(rootDir, "public");
// 样式文件根目录
const styleDir = path.join(staticDir, "style");
// 脚本文件根目录
const scriptDir = path.join(staticDir, 'script');

// 移动端目录名称
const mobileDirName = "mobile";

const mkAlldir = () => {
    /**
     * 目录创建顺序
     */
    const mkOrder = [rootDir,viewDir,staticDir,styleDir,scriptDir,path.join(viewDir, mobileDirName),path.join(styleDir, mobileDirName),path.join(scriptDir, mobileDirName)];

    for(let i = 0;i < mkOrder.length;i++){
        fs.mkdirSync(mkOrder[i])
    }

    console.log(chalk.green("目录创建成功"))
}

const rmDir = (dir) => {
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
        const _dirContent = fs.readdirSync(dir);
        if (_dirContent.length) {
            for (let i = 0; i < _dirContent.length; i++) {
                const current = path.join(dir, _dirContent[i]);
                if (fs.statSync(current).isDirectory()) {
                    rmDir(current);
                } else {
                    fs.unlinkSync(current)
                }
            }

            fs.rmdirSync(dir);
        } else {
            fs.rmdirSync(dir);
        }
    } else {
        console.log(chalk.red("文件夹不存在"))
    }
}

module.exports = () => {
    if (fs.existsSync(rootDir)) {
        console.log(chalk.yellow('template文件夹已经存在，是否要重新创建，重新创建会删除该目录，请谨慎选择'))
        inquirer.prompt([
            {
                type: "list",
                message: "要删除该目录重新创建么？",
                name: "isRM",
                choices: [
                    {
                        name: "是",
                        value: true
                    },
                    {
                        name: "否",
                        value: false
                    }
                ]
            }
        ])
            .then(res => {
                if (res.isRM) {
                    rmDir(rootDir)
                    mkAlldir()
                } else {
                    console.log(chalk.yellow("你选择了【否】，程序退出"));
                }
            })
    } else {
        mkAlldir();
    }
}