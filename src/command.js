import { readdir } from 'fs/promises'

const ls = async (dir) => {
    const files = await readdir(dir)
    console.log(files)
}

export { ls }