import os from 'os'
import { getFirstArg } from './helper.js'

const getEOL = () => {
  return os.EOL.replace('\r', 'CR').replace('\n', 'LF')
}

const getCpus = () => {
  const cpus = os.cpus()
  let info = `Total ${cpus.length} CPUS:`
  cpus.forEach((cpu) => {
    info += `${os.EOL}  ${cpu.model} (current speed ${cpu.speed / 1000} GHz)`
  })
  return info
}

const OSInfo = (msg) => {
  const operation = getFirstArg(msg)
  switch (operation) {
    case '--EOL':
      console.log(`End of line symbol: ${getEOL()}`)
      break;

    case '--cpus':
      console.log(getCpus())
      break;

    case '--homedir':
      console.log(`Your home directory is ${os.homedir()}`)
      break;

    case '--username':
      console.log(`Your current system user name is ${os.userInfo().username}`)
      break;

    case '--architecture':
      console.log(`CPU architecture is ${os.arch()}`)
      break;

    default:
      throw new Error('Invalid input')
  }
}



export { OSInfo }