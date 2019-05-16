
let fs = require('fs');
let compPath = 'src/components/';
let pagePath = 'src/pages/';
let moment = require('moment');
let cptType = process.argv[2]
let cptName = process.argv[3];
let path = cptName.split('/');
let name = path[path.length - 1];
let writes = [`${cptName}.vue`];
let reads = [`cptTemp.vue`];
let basepath = cptType === 'components'? compPath:pagePath
let file = [];
let author = require('os').homedir().split('\\').pop();




//检测是否存在文件夹
let exists = function () {
    return new Promise((res, rej) => {
        (async function () {
            for (let a of path) {
                fs.existsSync(basepath + a) ? basepath = `${basepath}${a}/` : await mkdir(a);
            }
            res(basepath);
        })()
    })
}
//建立文件夹
let mkdir = function (a) {
    return new Promise((res, rej) => {
        fs.mkdir(basepath + a, (err) => {
            if (err) rej(err);
            basepath = `${basepath}${a}/`
            res(basepath);
        });
    })
}
//读取模板文件内容，并替换为目标组件
let readFile = function () {
    return new Promise((res) => {
        for (let a of reads) {
            let text = fs.readFileSync(a).toString();
            text = text.replace(/time/g, moment().format('YYYY/MM/DD'))
                .replace(/comName/g, name)
                .replace(/author/g, author)
            file.push(text)
        }
        res(file);
    })
}
//生成文件，并填入之前读取的文件内容
let writeFile = function (file) {
    return new Promise((res, rej) => {
        (async function () {
            for (let a of writes) {
                await fs.writeFile(`${basepath}${a}`,
                    a == writes[3] ? file[0] : a == writes[0] ? file[1] : '', (err) => {
                        if (err) rej(err)
                    })
            }
            res('succ');
        })()
    })
}
async function creatCpt() {
    try {
        await exists();
        await readFile()
        await writeFile(await readFile());
        return console.log(`Successfully created ${name} ${cptType}`)
    }
    catch (err) {
        console.error(err);
    }
}
creatCpt();