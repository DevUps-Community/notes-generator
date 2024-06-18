const fs = require('fs')
const marked = require('marked')

const readMarkDownFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (error, result) => {
            if (error) {
                return reject(error)
            }
            resolve(result)
        })
    })
}

const main = async () => {
    try {
        const filePath = 'node.md'
        const result =  await readMarkDownFile(filePath)
        console.log('markdown contents: \n', result);
        
    } catch (error) {
        console.error('Error reading file', error)
    }
}

main()

// TODO Be able to accept json files 
// TODO Read json files 
// TODO Create js objects based on json file
// TODO Write new files