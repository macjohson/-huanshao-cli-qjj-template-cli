const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

const rootDir = "template";
const viewDir = "view";
const staticDir = "public";

const mobileDir = "mobile";


const mkdirRoot = () => fs.mkdirSync(path.join(__dirname, rootDir));

const rmDir = (dir)=>{
    if(fs.existsSync(dir) && fs.statSync(dir).isDirectory()){
        const _dirContent = fs.readdirSync(dir);
        if(_dirContent.length){
            for(let i = 0;i < _dirContent.length;i++){
                const current = path.join(dir,_dirContent[i]);
                if(fs.statSync(current).isDirectory()){
                    rmDir(current);
                }else{
                    fs.unlinkSync(current)
                }
            }

            fs.rmdirSync(dir);
        }else{
            fs.rmdirSync(dir);
        }
    }else{
        console.log(chalk.red("文件夹不存在"))
    }
}

module.exports = () => {
    if (fs.existsSync(path.join(__dirname, rootDir))) {
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
                    rmDir(path.join(__dirname, rootDir))
                    mkdirRoot();
                }else{
                    console.log(chalk.yellow("你选择了【否】，程序退出"));
                }
            })
    } else {
        fs.mkdirSync(path.join(__dirname, rootDir));
    }
}