import path from 'path';
import os from 'os';
import fs from 'fs';
import { getUsername } from './src/getUsername.js';
import { getCommand, getHomeDir } from './src/helper.js'
import readline from 'readline';
import { stdin as input, stdout as output } from 'process';
import { farewell, greeting } from './src/greeting-farewell.js';
import { ls } from './src/command.js';

let username = getUsername()
console.log(greeting(username))

let dir = getHomeDir()
console.log(dir)


const rl = readline.createInterface({ input, output });
rl.on('line', async (message) => {
  console.log(dir)
  const command = getCommand(message)
  switch (command) {
    case 'ls':
      await ls(dir)
      break;

    default:
      break;
  }
})
rl.on('SIGINT', () => rl.close())
rl.on('close', () => console.log(farewell(username)))

