const dirList = require('./dirJson.js');

// md文档目录前缀
const common_prefix = dirList.common_prefix;

// 生成的pdf目录前缀
const commonpdf_prefix = dirList.commonpdf_prefix;

// md文档读取目录
let readDirList = dirList.readDirList;
// pdf生成目录   没有指定pdf生成目录，则默认为md文档读取目录
let productDirList = dirList.productDirList;
if (!productDirList || productDirList.length == 0) {
    productDirList = readDirList;
}

let docReadDirList = [], pdfProductDirList = [];
readDirList.forEach((item) => {
    docReadDirList.push(common_prefix + item);
});

productDirList.forEach((item) => {
    pdfProductDirList.push(commonpdf_prefix + item);
});

module.exports = {
    docReadDirList,
    pdfProductDirList
};