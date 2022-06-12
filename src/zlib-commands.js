import zlib from 'node:zlib';
import fs from 'fs';
import { getPathToZip } from './helper.js';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';

const pipe = promisify(pipeline);

const compress = async (dir, message) => {
    const { pathToFile, pathToDestination } = await getPathToZip(dir, message)
    const TotalPathToDestination = pathToDestination + '.br'
    const stream = zlib.createBrotliCompress()

    const source = fs.createReadStream(pathToFile);
    const destination = fs.createWriteStream(TotalPathToDestination);
    await pipe(source, stream, destination)
}

const decompress = async (dir, message) => {
    const { pathToFile, pathToDestination } = await getPathToZip(dir, message)

    const stream = zlib.createBrotliDecompress()

    const source = fs.createReadStream(pathToFile);
    const destination = fs.createWriteStream(pathToDestination);
    await pipe(source, stream, destination)
}

export { compress, decompress }