#!/usr/bin/env node

const {execSync} = require('child_process');

if (process.argv.length < 3) {
  console.log('Please provide a repository name');
  process.exit(1);
}

const runCommand = commnd => {
    try {
        execSync(`${commnd}, {stdio: 'inherit'}`);
    } catch (error) {
        console.log(`Failed to execute ${commnd}`, error);
        return false;
    }
    return true;
}

const repoName= process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 git@bitbucket.org:turtleshelltechnologies/vite-starter.git ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`cloning the repository ${repoName}`);

const checkout = runCommand(gitCheckoutCommand);
if(!checkout) process.exit(-1);

console.log(`installing dependencies for ${repoName}`);
const installDeps = runCommand(installDepsCommand);
if(!installDeps) process.exit(-1);

console.log("Congratulations! You are ready. Follow the below commands to start");
console.log(`cd ${repoName} && npm start`);