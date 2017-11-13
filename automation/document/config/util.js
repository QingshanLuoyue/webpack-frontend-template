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
            if (splitPath[len - 1].slice(0,1) === '_') {
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

// 按照序号进行分类
function classify(arr) {
    // 按照序号排重，确定具体类别
    let numArr = [];
    // 最终分类对象
    let jsonArr = [];
    arr.forEach((item) => {
        let n = item.split('/')[1].split('-')[0].split('.')[0];
        let flag = false;
        for (let i = 0; i < numArr.length; i++) {
            if (numArr[i] == n) {
                flag = true;
                break;   
            }
        }
        if (!flag) {
            numArr.push(n);
        }
    });
    numArr.forEach((item) => {
        let obj = {};
        obj[item] = [];
        for (let i = 0; i < arr.length; i++) {
            let rangeNum = arr[i].split('/')[1].split('-')[0].split('.');
            let rangeLen = rangeNum.length;
            if (rangeNum[0] == item) {
                obj[item].push(arr[i]);
                if (rangeLen > 1) {
                    obj['hasChild'] = true;
                } else {
                    obj['hasChild'] = false;
                }
            }
        }
        jsonArr.push(obj);
    });
    return jsonArr;
}


// 冒泡排序
// 排序读取到的md文件路径
function bubbleSort(arr) {
    // 最终排序过后的路径数组
    let resolveArr = [];
    // 截取文档名字中的序号，进行排序
    let sortNumArr = [];
    let obj = {};
    arr.forEach((item) => {
        sortNumArr.push(item.split('/')[1].split('-')[0]);
        obj[item.split('/')[1].split('-')[0]] = item;
    });
    let len = sortNumArr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            let c1 = sortNumArr[j].split('.');
            let c2 = sortNumArr[j + 1].split('.');
            c1[0] = parseInt(c1[0]);
            c1[1] && (c1[1] = parseInt(c1[1]));
            c2[0] = parseInt(c2[0]);
            c2[1] && (c2[1] = parseInt(c2[1]));

            let temp = '';
            if (c1.length == 2 && c2.length == 2) {
                if (c1[0] > c2[0]) {
                    temp = sortNumArr[j+1];        //元素交换
                    sortNumArr[j+1] = sortNumArr[j];
                    sortNumArr[j] = temp;
                } else if (c1[0] == c2[0]) {
                    if (c1[1] > c2[1]) {
                        temp = sortNumArr[j+1];        //元素交换
                        sortNumArr[j+1] = sortNumArr[j];
                        sortNumArr[j] = temp;
                    }
                }
            } else if (c1.length == 1 && c2.length == 2) {
                if (c1[0] > c2[0]) {
                    temp = sortNumArr[j+1];        //元素交换
                    sortNumArr[j+1] = sortNumArr[j];
                    sortNumArr[j] = temp;
                } else if (c1[0] == c2[0]) {
                    if (c2[1] != 0) {
                        temp = sortNumArr[j+1];        //元素交换
                        sortNumArr[j+1] = sortNumArr[j];
                        sortNumArr[j] = temp;
                    }
                }
            } else if (c1.length == 2 && c2.length == 1) {
                if (c1[0] > c2[0]) {
                    temp = sortNumArr[j+1];        //元素交换
                    sortNumArr[j+1] = sortNumArr[j];
                    sortNumArr[j] = temp;
                } else if (c1[0] == c2[0]) {
                    if (c1[0] != 0) {
                        temp = sortNumArr[j+1];        //元素交换
                        sortNumArr[j+1] = sortNumArr[j];
                        sortNumArr[j] = temp;
                    }
                }
            } else if (c1.length == 1 && c2.length == 1) {
                if (c1[0] > c2[0]) {
                    temp = sortNumArr[j+1];        //元素交换
                    sortNumArr[j+1] = sortNumArr[j];
                    sortNumArr[j] = temp;
                }
            }
        }
    }
    sortNumArr.forEach((item) => {
        resolveArr.push(obj[item]);
    });
    return resolveArr;
}