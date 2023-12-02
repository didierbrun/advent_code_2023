import fs from 'fs'

class FileParser {
}

FileParser.readFile = ( path ) => {
    const content = fs.readFileSync(path, { encoding: 'utf8' })
    return content.split('\n')
}

export default FileParser