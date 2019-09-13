export {};
const chokidar = require('chokidar');
const fs = require('fs-extra');
const childProcess = require('child_process');

import { DEV_PROJECT_PATH } from '../dev-config';

const dirToWatch = 'src/**/*.ts';
const log = console.log.bind(console);

// Initialize watcher.
const watcher = chokidar.watch(dirToWatch, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    awaitWriteFinish: true,
    ignoreInitial: true,
});

log('Watching changes in files using pattern ' + dirToWatch);

watcher
    .on('add', path => buildAndCopy(path, 'added'))
    .on('change', path => buildAndCopy(path, 'changed'))
    .on('unlink', path => buildAndCopy(path, 'unlinked'));

// Build package and copy dist files + package.json to project
const buildAndCopy = (path, type) => {
    log(`--- File ${path} has been ${type} ---`);
    log('Rebuilding Package...');
    childProcess.exec('npm run build', [], (error, stdout, stderr) => {
        if(error) {
            log(error);
        }

        if(stdout) {
            log('Package build. Copying to destination project...');
            const destinationPath = DEV_PROJECT_PATH + 'node_modules/bananaquitjs';
            fs.copy('./dist', destinationPath, {
                overwrite: true,
            }).then(() => {
                fs.copy('./package.json', destinationPath + '/package.json').then(() => log('Package copied to ' + destinationPath + '\n'));
            }).catch((copyError) => log(copyError));
        }
    });
}