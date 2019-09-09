export {};
const fs = require('fs-extra');

const distContentsToMove = './dist/';

fs.readdir(distContentsToMove).then((files) => {
    files.forEach(file => {
        const filePath = distContentsToMove + file;
        const destinationPath = './' + file;
        try {
            fs.copySync(filePath, destinationPath)
            console.log(filePath + ' => ' + destinationPath)
        } catch (err) {
            console.error(err)
        }
    });
});

