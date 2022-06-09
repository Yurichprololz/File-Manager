import { getUsername } from './src/getUsername.js';
import { getCommand, getHomeDir } from './src/helper.js'
import readline from 'readline';
import { stdin as input, stdout as output } from 'process';
import { farewell, greeting } from './src/greeting-farewell.js';
import { ls, cd, up } from './src/command.js';
import { OSInfo } from './src/os-command.js';

const rl = readline.createInterface({ input, output });
let username = getUsername()
console.log(greeting(username))

let dir = getHomeDir()
console.log(`You are currently in ${dir}`)


rl.on('line', async (message) => {
  const command = getCommand(message)
  commandWorker(command, message)
    .then(() => console.log(`You are currently in ${dir}`))
})

rl.on('SIGINT', () => rl.close())
rl.on('close', () => console.log(farewell(username)))

async function commandWorker(command, message) {
  switch (command) {
    case 'ls':
      await ls(dir)
      break;
    case 'cd':
      dir = await cd(dir, message)
      break;
    case 'up':
      dir = up(dir)
      break;

    case 'os':
      OSInfo(message)
      break;

    default:
      break;
  }
}

