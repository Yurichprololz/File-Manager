import fs from 'fs/promises'
import path from 'path';

const getHomeDir = () => {
  return process.env.HOME || process.env.USERPROFILE;
}

const getCommand = (msg) => {
  return msg.split(' ')[0]
}

const getFirstArg = (msg) => {
  return msg.split(' ')[1]
}

const getPathToZip = async (dir, message) => {
  const { first, second } = getTwoArg(message)
  const pathToFile = path.join(dir, first)
  const pathToDestination = path.join(dir, second)

  return await isFile(pathToFile)
    .then(() => {
      return {
        pathToFile,
        pathToDestination
      }
    })
}

const getTwoArg = (msg) => {
  return {
    first: msg.split(' ')[1],
    second: msg.split(' ')[2],
  }
}

const isDirectory = async (path) => {
  return await fs.access(path)
    .catch(() => {
      throw new Error('Operation failed')
    })
    .then(async () => {
      const stats = await fs.stat(path)
      if (stats.isDirectory()) {
        return true
      }
      throw new Error('Operation failed')
    })

}

const isFile = async (path) => {
  return await fs.access(path)
    .catch(() => {
      throw new Error('Operation failed')
    })
    .then(async () => {
      const stats = await fs.stat(path)
      if (stats.isFile()) {
        return true
      }
      throw new Error('Operation failed')
    })

}

const showDir = (dir) => {
  console.log(`You are currently in inner ${dir}`)
}

export { getHomeDir, getCommand, getFirstArg, isDirectory, isFile, getTwoArg, getPathToZip, showDir }