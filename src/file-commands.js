import { getFirstArg, getTwoArg, isFile } from "./helper.js"
import path from 'path'
import { createReadStream, createWriteStream } from "fs"
import fs from 'fs/promises'


const getDataFromStream = (pathToFile) => {
  return new Promise((res) => {
    let data = ''
    const stream = createReadStream(pathToFile, 'utf-8')
    stream.on('data', (chunck) => {
      data += chunck
    })
    stream.on('end', () => {
      res(data)
    })
  })
}

const readFile = async (dir, message) => {
  const file = getFirstArg(message)

  const pathToFile = path.join(dir, file)
  await isFile(pathToFile)
    .then(async () => console.log(await getDataFromStream(pathToFile)))


}

const createFile = async (dir, message) => {
  const file = getFirstArg(message)

  return new Promise((res, rej) => {
    const pathToFile = path.join(dir, file)
    const writeStream = createWriteStream(pathToFile, { encoding: 'utf-8', flags: 'wx' })
    writeStream.on('error', () => {
      rej(new Error('Operation failed'))
    })
    writeStream.write('', (err) => {
      if (!err) res()
    })
  })
}

const renameFile = async (dir, message) => {
  const { first: file, second: newName } = getTwoArg(message)
  const pathToFile = path.join(dir, file)
  const pathnewName = path.join(path.parse(pathToFile).dir, newName)

  await fs.rename(pathToFile, pathnewName)
    .catch(() => {
      throw new Error('Operation failed')
    })
}

const copyFile = async (dir, message) => {
  const { first: file, second: destinationFolder } = getTwoArg(message)
  const pathToFile = path.join(dir, file)
  const pathToDestination = path.join(dir, destinationFolder, file)
  if (pathToFile === pathToDestination) throw new Error('Operation failed')

  await fs.copyFile(pathToFile, pathToDestination)
}

const moveFile = async (dir, message) => {
  await copyFile(dir, message)
    .then(async () => await deleteFile(dir, message))
}

const deleteFile = async (dir, message) => {
  const file = getFirstArg(message)
  const pathToFile = path.join(dir, file)

  await fs.unlink(pathToFile)
    .catch(() => {
      throw new Error('Operation failed')
    })
}

export { readFile, createFile, renameFile, copyFile, moveFile, deleteFile }