const fs = require('fs-extra');

const filesToRemove = [
    './core/',
    './index.js',
    './index.d.ts'
]

filesToRemove.forEach(file => {
    fs.remove(file, () => {
        console.log('Removed generated ' + file);
    });
})
