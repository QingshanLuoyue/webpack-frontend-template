const path = require('path');
const getDirectory = require('../entryDir');




// 动态路径目录
const dynamicPageDir = path.join(__dirname, '../../src/entry/dynamic');
// 静态路径目录
const staticPageDir = path.join(__dirname, '../../src/entry/static');
/*例如：
/Users/zego/WebstormProjects/apollo/website/src/entry/dynamic*/




/*需要忽略读取的文件
const ignoreFileArr = [
    path.join(__dirname, '../../src/entry/product/product.js')
];
const res = getDirectory(pageDir, ignoreFileArr);*/




// 读取文件列表
const dynamicPageList = getDirectory(dynamicPageDir);
const staticPageList = getDirectory(staticPageDir);
/*例如：
[ '/Users/zego/WebstormProjects/apollo/website/src/entry/dynamic/about/about-zego.js',
  '/Users/zego/WebstormProjects/apollo/website/src/entry/dynamic/article/a/a1.js',
  '/Users/zego/WebstormProjects/apollo/website/src/entry/dynamic/article/media-report/index.js',
]*/



// 构造webpack入口文件对象
let dynamicEntry = {};
let staticEntry = {};
let dynamicPageDirLen = dynamicPageDir.length;
let staticPageDirLen = staticPageDir.length;
dynamicPageList.forEach(function(filename) {
    let index = filename.indexOf(dynamicPageDir);
    let entryKey = filename.slice(dynamicPageDirLen + index + 1).replace(/.js$/, '');
    dynamicEntry[entryKey] = filename;
});
staticPageList.forEach(function(filename) {
    let index = filename.indexOf(staticPageDir);
    let entryKey = filename.slice(staticPageDirLen + index + 1).replace(/.js$/, '');
    staticEntry[entryKey] = filename;
});
console.log('dynamicEntry = ', dynamicEntry);
console.log('staticEntry = ', staticEntry);

// webpack入口文件
let webpackEntry = Object.assign(dynamicEntry, staticEntry);
console.log('webpackEntry = ', webpackEntry);

module.exports = {
    webpackEntry,
    dynamicEntry,
    staticEntry,
};


