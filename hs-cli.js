#! /usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');

const mkdir = require('./mkdir.js');

program
        .command('init')
        .description("初始化企加佳官网模版项目")
        .action(()=>{
            const options = [
                {
                    type:"input",
                    name:"viewDir",
                    message:"请输入模版文件的输出根目录，默认为${baseDir}/app/view或egg.js 用户配置目录【default配置】"
                },
                {
                    type:"input",
                    name:"publicDir",
                    message:"请输入css和js的输出根目录，默认为${baseDir}/app/public或egg.js 用户配置目录【default配置】"
                }
            ]

            inquirer.prompt(options).then(res => {
                console.log(res)
                mkdir();
            })
        })

program.parse(process.argv);