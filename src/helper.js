import fs from 'fs/promises'


const getHomeDir = () => {
  return process.env.HOME || process.env.USERPROFILE;
}

const getCommand = (msg) => {
  return msg.split(' ')[0]
}

const getFirstArg = (msg) => {
  return msg.split(' ')[1]
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

export { getHomeDir, getCommand, getFirstArg, isDirectory, isFile }