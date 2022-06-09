import { getUsername } from './src/getUsername.js';
import { getCommand, getHomeDir } from './src/helper.js'
import readline from 'readline';
import { stdin as input, stdout as output } from 'process';
import { farewell, greeting } from './src/greeting-farewell.js';
import { ls, cd, up } from './src/command.js';
import { OSInfo } from './src/os-command.js';
import { showHash } from './src/hash-command.js';

const rl = readline.createInterface({ input, output });
let username = getUsername()
console.log(greeting(username))

let dir = getHomeDir()
console.log(`You are currently in ${dir}`)


rl.on('line', async (message) => {
  const command = getCommand(message)
  await commandWorker(command, message)
    .catch((e) => console.log(e.message))
    .finally((lastComannd) => {
      if (!lastComannd) console.log(`You are currently in ${dir}`)
    })
})

rl.on('SIGINT', () => rl.close())
rl.on('close', () => console.log(farewell(username)))

async function commandWorker(command, message) {
  let isExit = false

  switch (command) {
    case 'ls':
      await ls(dir)
      break;
    case 'cd':
      await cd(dir, message)
        .then((path) => {
          dir = path
        })
      break;
    case 'up':
      dir = up(dir)
      break;

    case 'os':
      OSInfo(message)
      break;

    case 'hash':
      await showHash(dir, message)
      break;

    case '.exit':
      isExit = true
      rl.close()
      break;

    default:
      break;
  }

  return isExit
}

