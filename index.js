import { getUsername } from './src/getUsername.js';
import { getCommand, getHomeDir, showDir } from './src/helper.js'
import readline from 'readline';
import { stdin as input, stdout as output } from 'process';
import { farewell, greeting } from './src/greeting-farewell.js';
import { ls, cd, up } from './src/command.js';
import { OSInfo } from './src/os-command.js';
import { showHash } from './src/hash-command.js';
import { compress, decompress } from './src/zlib-commands.js';
import { readFile, createFile, deleteFile, renameFile, copyFile, moveFile } from './src/file-commands.js';

const rl = readline.createInterface({ input, output });
let username = getUsername()
console.log(greeting(username))

let dir = getHomeDir()
showDir(dir)


rl.on('line', async (message) => {
  const command = getCommand(message)
  await commandWorker(command, message)
    .then((lastComannd) => {
      if (!lastComannd) {
        showDir(dir)
      }
    })
    .catch((e) => {
      console.log('Error: ', e.message)
      showDir(dir)
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
        .then((path) => dir = path)
      break;

    case 'up':
      dir = up(dir)
      break;

    case 'cat':
      await readFile(dir, message)
      break;

    case 'add':
      await createFile(dir, message)
        .then(() => console.log('The file created'))
      break;

    case 'rn':
      await renameFile(dir, message)
        .then(() => console.log('The file have renamed successfully'))
      break;

    case 'cp':
      await copyFile(dir, message)
        .then(() => console.log('The file have been copied'))
      break;

    case 'mv':
      await moveFile(dir, message)
        .then(() => console.log('The file has moved'))
      break;

    case 'rm':
      await deleteFile(dir, message)
        .then(() => console.log('The file has deleted successfully'))
      break;

    case 'os':
      OSInfo(message)
      break;

    case 'compress':
      await compress(dir, message)
        .then(() => console.log('Compressing has succeeded'))
      break;

    case 'decompress':
      await decompress(dir, message)
        .then(() => console.log('Decompressing has succeeded'))
      break;

    case 'hash':
      await showHash(dir, message)
      break;

    case '.exit':
      isExit = true
      rl.close()
      return isExit

    default:
      throw new Error('Invalid input')
  }
}

