const fsPromises = require('fs/promises')
const path = require("path")

/**
 * @summary The method removes all the files from the given folder path expect the .gitignore file.
 * @param folderPath the folder path to delete the files from.
 * @return {Promise<void>}
 *
 *
 */
const emptyFolder = async (folderPath) => {
    try {
        // Find all files in the folder
        const files = await fsPromises.readdir(folderPath)
        for (const file of files) {
            // Do not delete .gitignore file
            if (!file.includes('.gitignore')) {
                await fsPromises.unlink(path.resolve(folderPath, file))
                console.log(`${folderPath}/${file} has been removed successfully`)
            }
        }
    } catch (err) {
        console.log(err)
    }
}

emptyFolder(path.join(process.cwd(), 'reports')).then()
emptyFolder(path.join(process.cwd(), 'videos')).then()


