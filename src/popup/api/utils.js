// export const isEmpty = obj => {
//     for(const key in obj) {
//         if(obj.hasOwnProperty(key)) {
//             return false;
//         }
//     }
//     return true;
// }
//
// #!/usr/bin/env node


require('babel-polyfill');
const { exec, execSync } = require('child_process').exec;
const { docopt } = require('docopt');
const path = require('path');
const fs = require('fs-extra');
const Builder = require('../build/Builder.js');
const cwd = process.cwd();
const uiBuildPath = path.join(cwd, '/builds/ui.js');
const serverBuildPath = path.join(cwd, '/builds/server.js');
const publicFolderPath = path.join(cwd, '/public');
const libPath = path.join(__dirname, '../');
const binariesFolderPath = path.resolve(libPath, 'bin/')
const electronFolderPath = path.resolve(libPath, 'electron/');
const customPackagePath = path.join(cwd, 'package.json')
const { release } = require(customPackagePath);
const isValidReleaseURL = (release && release.hostname && release.port && release.pathname && release.filename);
const ReleaseServer = require('../build/ReleaseServer.js');
const tmpDirPath = path.join(cwd, 'tmp')

const doc = `
    Usage:
    erpjs build [<src>] [options]
    erpjs extract-lang [<src>]
    erpjs compile [<src>] [<target>] [<release>] [options]
    erpjs run client [<src>] [options]
    erpjs run server [<src>] [options]
    erpjs run devserver [<src>] [options]
    erpjs run static [<src>] [options]

    Options:
    -p --isProduction     Enable production mode.
    -u --updatePublic     update public folder
`;

const opts = docopt(doc);
const isProduction = Boolean(opts['--isProduction']);

if (isProduction) {
    process.env.PRODUCTION = true;
    console.log('PRODUCTION MODE ENABLED');
}
const customSrc = opts['<src>'] || 'srcCustom';
const customSrcPath = path.join(cwd, customSrc);
const langFolderPath = path.resolve(customSrcPath, '../lang');
const langConfigPath = path.resolve(cwd, '/lang.json');
const { languages } = require(langConfigPath);

async function runBuild(options) {
    await fs.ensureDir(tmpDirPath).catch(err => {
        console.error('CAN NOT CREATE TMP FOLDER', err);
        process.exit();
    });
    const electronFolder = path.resolve(cwd, 'electron/');

    const builder = new Builder({
        src: 'src',
        electronFolder,
        customSrc,
        isProduction
    });

    return builder.build(options).then(() => {
        console.log('BUILD DONE.');
        updatePublicFolder();
    }).catch(error => console.error('ERROR', error));
}

function updatePublicFolder() {
    const needUpdatePublic = Boolean(opts['--updatePublic']);

    if (needUpdatePublic) {
        const uiBuildTargetPath = path.join(publicFolderPath, 'bundle.js');
        fs.ensureDirSync(publicFolderPath)
        fs.copySync(uiBuildPath, uiBuildTargetPath)
        console.log(`${uiBuildTargetPath} updated`);
    }
}

function runExtractLang() {
    const extractScriptPath = path.join(binariesFolderPath, './extract_lang.sh');
    const command = `${extractScriptPath} ${customSrcPath} ${libPath} ${langFolderPath} ${languages.join(' ')}`;
    const proc = exec(command);

    proc.stderr.on('data', (err) => {
        console.error(err.toString());
    });

    proc.on('exit', () => {
        runInsertLang(langFolderPath);
    });

    process.on('SIGINT', () => {
        console.log('Caught interrupt signal');
        proc.kill('SIGINT');
        process.exit();
    });
    fs.copySync(langConfigPath, electronFolderPath)
    fs.copySync(langConfigPath, langFolderPath)
}

function runInsertLang(langPath) {
    const insertScriptPath = path.join(binariesFolderPath, './po2json.sh');
    const command = `${insertScriptPath} ${langPath} ${languages.join(' ')}`;
    const proc = exec(command);

    proc.stderr.on('data', (err) => {
        console.error(err.toString());
    });

    proc.on('exit', () => {
        const dstLangPath = path.join(__dirname, '../lang');

        fs.exists(dstLangPath, exists => {
            if (exists) {
                console.log('Lang folder exists');
            } else {
                fs.symlink(langPath, dstLangPath, () => {
                    console.log('Symlink for lang folder created');
                });
            }
        });
    });

    process.on('SIGINT', () => {
        console.log('Caught interrupt signal');
        proc.kill('SIGINT');
        process.exit();
    });
}

function runServer(isDevserver) {
    const engine = isDevserver
        ? 'node_modules/.bin/nodemon --watch builds/hot/server -e js'
        : 'node';
    const command = `${engine} ${serverBuildPath}`;
    const proc = exec(command);

    proc.stdout.on('data', data => {
        console.log(data);
    });

    proc.stderr.on('data', err => {
        console.error(err);
    });

    process.on('SIGINT', () => {
        console.log('Caught interrupt signal');
        proc.kill('SIGINT');
        process.exit();
    });
}

function runStaticServer() {
    if (!isValidReleaseURL) {
        console.log('invalid release option in package');
        console.log('release: ', release);
        process.exit();
    }

    updatePublicFolder();

    const server = new ReleaseServer({
        port: release.port,
        src: 'public',
        route: release.pathname
    });

    server.run();
}

function runClient(isDevserver) {
    const devserverPort = process.env.DEVSERVER_PORT || 3000;
    const buildPath = isDevserver
        ? `http://localhost:${devserverPort}/builds/ui.js`
        : './static/build/ui.js';
    const electronIndexPath = path.join(electronFolderPath, '/index.js');
    const electronBinaryPath = path.join(cwd, 'node_modules/.bin/electron');
    const command = `${electronBinaryPath} ${electronIndexPath} --buildPath ${buildPath}`;

    const uiBuildTargetPath = path.join(electronFolderPath, 'static/build/ui.js');

    if (!isDevserver) {
        fs.copySync(uiBuildPath, uiBuildTargetPath)
    }
    fs.writeFileSync(`${electronFolderPath}/variables.json`, JSON.stringify({ isProduction }));

    const proc = exec(command);

    proc.stdout.on('data', (d) => {
        console.log(d.toString());
    });

    proc.stderr.on('data', (err) => {
        console.error(err.toString());
    });

    process.on('SIGINT', () => {
        console.log('Caught interrupt signal');
        proc.kill('SIGINT');
        process.exit();
    });
}

function runCompiler() {
    const uiBuildTargetPath = path.join(electronFolderPath, 'static/build/ui.js');
    const HtmlTemplate = require(`${electronFolderPath}/index_template`);
    const buildPath = isValidReleaseURL
        ? `${release.hostname}:${release.port}${release.pathname}/${release.filename}`
        : uiBuildPath;
    const html = HtmlTemplate({ buildPath });
    console.log('PATH, USED FOR BUNDLE: ', buildPath);

    fs.writeFileSync((`${electronFolderPath}/index.html`), html);
    fs.writeFileSync(`${electronFolderPath}/variables.json`, JSON.stringify({ isProduction }));

    if (!isValidReleaseURL) {
        fs.copySync(uiBuildPath, uiBuildTargetPath)
    }

    const tmpElectronPath = path.join(tmpDirPath, 'electron');
    const distPath = path.join(cwd, 'dist');

    fs.removeSync(tmpElectronPath)
    fs.removeSync(distPath)
    console.log('OLD DIST REMOVED IF EXISTS')

    fs.copySync(electronFolderPath, tmpElectronPath)
    fs.copySync(customPackagePath, path.join(tmpElectronPath, 'package.json'))

    console.log('START BUILDING PACKAGE.');
    const publishOption = (opts['<release>'] === 'release') ? ' --publish always' : '';

    const electronBuilderBinary = path.resolve(cwd, '/node_modules/.bin/electron-builder')
    const command = `cd ${tmpElectronPath} && ${electronBuilderBinary} --${opts['<target>']}${publishOption}`;

    execSync(command, { stdio: 'inherit' });
    console.log('FINISH BUILDING PACKAGE');

    fs.moveSync(path.join(tmpElectronPath, 'dist'), distPath)
    console.log(`dist folder moved to root directory ${distPath}`);

    console.log('COMPILATION END');
}

if (opts.build) {
    runBuild({ compileClient: true, compileServer: true });
} else if (opts['extract-lang']) {
    runExtractLang();
} else if (opts.compile) {
    runBuild({ compileClient: true, compileServer: true }).then(runCompiler);
} else if (opts.run && opts.server) {
    runBuild({ compileServer: true }).then(runServer);
} else if (opts.run && opts.client) {
    runBuild({ compileClient: true }).then(runClient);
} else if (opts.run && opts.static) {
    runBuild({ compileClient: true }).then(runStaticServer);
} else if (opts.run && opts.devserver) {
    runExtractLang();
    runBuild({ runDevserver: true, compileClient: true, compileServer: true }).then(() => {
        runClient(true);
        runServer();
    }).catch(e => console.error(e));
}