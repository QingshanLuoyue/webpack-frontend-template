const path = require('path');


// md文档目录前缀
const common_prefix = path.resolve(__dirname, '../../src/static/docs');
// 生成的pdf目录前缀
// const commonpdf_prefix = path.resolve(__dirname, './pdf');
const commonpdf_prefix = path.resolve(__dirname, '../../src/static/docs/pdf/server');


// md文档读取目录
const readDirList = [
    // '/API',
    // '/Applications/1-VideoLive',
    // '/Applications/7-WaWaJi',
    // '/FAQ',
    '/server',
    // '/ZegoAudioRoom',
    // '/ZegoLiveRoom',
];
// pdf生成目录      注：pdf生成目录与md文档读取目录一一对应， 没有指定pdf生成目录，则默认为md文档读取目录
const productDirList = [
    '/'
];


module.exports = {
    common_prefix,
    commonpdf_prefix,
    readDirList,
    productDirList
};