const fs = require('fs');
const path = require('path');

// 应用场景 得到对象
const applications = require('./routejson/_Applications.js');

// 互动视频 实时语音  得到的是一个数组
const zegoLive_AudioRoom = require('./routejson/_zego-Live_Audio-Room.js');

// 后台文档 得到数组
const server = require('./routejson/_server.js');


let docData = [];

docData.push(applications);

zegoLive_AudioRoom.forEach((item) => {
    docData.push(item);
});

server.forEach((item) => {
    docData.push(item);
});

const stringifyData = JSON.stringify(docData);

console.log(stringifyData, '\n\n\n', '已在 src/entry/document/_docJson.json  生成最新文档数据！', '\n\n\n');
// 写入最终生成文件
fs.writeFileSync(path.resolve(__dirname,'../../src/entry/document/_docJson.json'), stringifyData);
// fs.writeFileSync(path.resolve(__dirname,'./docTestJson.json'), stringifyData);

// module.exports = docData;

