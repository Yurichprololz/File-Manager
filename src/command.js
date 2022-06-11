import fs, { readdir } from 'fs/promises'
import { getFirstArg as getFileToOperation, isDirectory } from './helper.js'
import path from 'path'

const ls = async (dir) => {
  const files = await readdir(dir)
  console.log(files)
}

const cd = async (dir, message) => {
  const currentFolder = getFileToOperation(message)
  const currentFolderPath = path.isAbsolute(currentFolder) ? currentFolder : path.join(dir, currentFolder)

  return await isDirectory(currentFolderPath)
    .then(() => currentFolderPath)
}

const up = (dir) => {
  return path.parse(dir).dir
}



export { ls, cd, up }