function getUsername() {
    let name;
    const arg = process.argv.slice(2)
    arg.forEach(element => {
        if (element.startsWith('--username')) {
            name = element.split('=')[1]
        }
    });
    if (!name) throw Error('Enter Username')
    return name;
}

export { getUsername }