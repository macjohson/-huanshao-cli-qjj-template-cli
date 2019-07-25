#! /usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');

const mkdir = require('./mkdir.js');
const fileWatch = require('./fileWatch.js');

program
        .command('init')
        .description("初始化企加佳官网模版项目")
        .action(()=>{
            mkdir();
        })

program
        .command('dev')
        .description("开始监听并编译项目")
        .action(()=>{
            fileWatch();
        })

program.parse(process.argv);