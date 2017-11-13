const fs = require('fs');
/*
    dir : 要查询的目录
    ignoreFileArr : 要忽视的目录数组列表
    reg: 需要对获取到的路径执行replace操作
*/  
const getDirectory = function(dir, ignoreFileArr, reg) {
    let children = [];
    fs.readdirSync(dir).forEach(function (filename) {
        if (filename === 'node_modules' || filename === '.DS_Store') {
            return;
        }
        let path = dir + '/' + filename;
        let stat = fs.statSync(path);
        // console.log('\n', '读取路径path=',path)
        if (ignoreFileArr) {
            for (let i = 0; i < ignoreFileArr.length; i++) {
                // console.log('忽略路径ignoreFileArr'+ i +'=',ignoreFileArr[i])
                if (path === ignoreFileArr[i]) {
                    return;
                }
            }
        }
        if (stat && stat.isDirectory()) {
            children = children.concat(getDirectory(path, ignoreFileArr, reg) && getDirectory(path, ignoreFileArr, reg));
        } else {
            let splitPath = path.split('/');
            // console.log(splitPath);
            let len = splitPath.length;
            // 排除下标由下划线开头和不是.md结尾的文件
            if (splitPath[len - 1].slice(0,1) === '_' || splitPath[len - 1].indexOf('.md') === -1) {
                return;
            }
            children.push(path.replace(reg, ''));
        }
    });
    return children;
};

module.exports = {
    getDirectory
};