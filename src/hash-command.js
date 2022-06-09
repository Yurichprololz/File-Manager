import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { getFirstArg as getFileToOperation, isFile } from './helper.js'
import path from 'path';

const showHash = async (dir, message) => {
  const pathToFile = path.join(dir, getFileToOperation(message))
  await isFile(pathToFile)
    .then(async () => {
      console.log(await calculateHash(pathToFile))
    })
};

const calculateHash = (pathToFile) => {
  return new Promise((res) => {
    const readStream = createReadStream(pathToFile)
    const hash = createHash('sha256')

    hash.on('readable', () => {
      const data = hash.read()
      if (data) {
        res(data.toString('hex'))
      }
    });

    readStream.on('data', (data) => {
      hash.write(data);
      hash.end();
    })
  })
};

export { showHash }