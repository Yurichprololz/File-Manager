const getHomeDir = () => {
    return process.env.HOME || process.env.USERPROFILE;
}

const getCommand = (msg) => {
    return msg.split(' ')[0]
}

export { getHomeDir, getCommand }