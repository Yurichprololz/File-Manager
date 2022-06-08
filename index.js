import path from 'path';
import os from 'os';
import fs from 'fs';
import { getUsername } from './src/getUsername.js';
import { getCommand, getHomeDir } from './src/helper.js'
import readline from 'readline';
import { stdin as input, stdout as output } from 'process';
import { farewell, greeting } from './src/greeting-farewell.js';

try {
  let dir = getHomeDir()
  let username = getUsername()
} catch (e) {
  throw e
}


console.log(greeting(username))

const rl = readline.createInterface({ input, output });
rl.on('line', (message) => {
  console.log(dir)
  const command = getCommand(message)
  switch (command) {
    case ls:

      break;

    default:
      break;
  }
  rl.prompt()

})
rl.on('SIGINT', () => rl.close())
rl.on('close', () => console.log(farewell(username)))

