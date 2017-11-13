const path = require('path');
const util = require('../config/util.js');

const applications_prefix = '/static/docs/Applications/';

// _Zego-Live_Audio-Room-SDK集成指引
const zegoRoomSDK = require('./part/_Zego-Live_Audio-Room-SDK-Optional.js');

// 常见问题
const faq = require('./_FAQ.js');

// 各场景json数据
const VideoLive = require('./part/_Applications-1-videolive.js');
const InstantVideo = require('./part/_Applications-2-instantvideo.js');
const InstantAudio = require('./part/_Applications-3-instantaudio.js');
const GameAudio = require('./part/_Applications-4-gameaudio.js');
const AudioLive = require('./part/_Applications-5-audiolive.js');
const GameLive = require('./part/_Applications-6-gamelive.js');
const Wawaji = require('./part/_Applications-7-wawaji.js');


// 最接近文件的目录数组
const closestDirList = [
    // 应用场景-视频直播
    {
        type: 'live',
        name: '1-VideoLive',
        jsonData: VideoLive,
    },
    // 应用场景-实时视频
    {
        type: 'live',
        name: '2-InstantVideo',
        jsonData: InstantVideo,
    },
    // 应用场景-实时语音
    {
        type: 'audio',
        name: '3-InstantAudio',
        jsonData: InstantAudio,
    },
    // 应用场景-娃娃机
    {
        type: 'live',
        name: '7-WaWaJi',
        jsonData: Wawaji,
    },
    // 应用场景-游戏语音
    {
        type: 'audio',
        name: '4-GameAudio',
        jsonData: GameAudio,
    },
    // 应用场景-语音直播
    {
        type: 'audio',
        name: '5-AudioLive',
        jsonData: AudioLive,
    },
    // 应用场景-游戏直播
    {
        type: 'live',
        name: '6-GameLive',
        jsonData: GameLive,
    },
];

// 目录数组
const dirList = [];
closestDirList.forEach((item) => {
    dirList.push(applications_prefix + item.name);
});
// console.log(dirList);
// [
//     '/static/docs/Applications/1-VideoLive',
//     '/static/docs/Applications/2-InstantVideo',
//     '/static/docs/Applications/3-InstantAudio',
//     '/static/docs/Applications/4-GameAudio',
//     '/static/docs/Applications/5-AudioLive',
//     '/static/docs/Applications/6-GameLive'
// ]



// 获取到的文档路径列表
const fileUrlGroupList = [];
const mainSearchDir = path.resolve(__dirname, '../../../src');
dirList.forEach((item, index) => {
    let curFileList = util.getDirectory(mainSearchDir + item, '', new RegExp('^.+' + closestDirList[index].name + '/'));
    fileUrlGroupList.push(curFileList);
});
// console.log(fileUrlGroupList);
// [
//     [
//         '1-VideoLive-Overview.md',
//         'Android/2-LiveDemo5-RunningGuide.md',
//         'Windows/2-LiveDemo5-RunningGuide.md',
//         'iOS/5-VideoLive-Implementation.md'
//     ],
//     [
//         '1-InstantVideo-Overview.md',
//         'Android/2-InstantTalk2-RunningGuide.md',
//         'Windows/2-InstantTalk2-RunningGuide.md',
//         'iOS/5-InstantVideo-Implementation.md'
//     ],
//     ···
// ]


// 根据ios／android／window分类后的文档路径数组
const classifyArr = [];
fileUrlGroupList.forEach((arrlist) => {
    let iosJson = [];
    let iosClientJson = [];
    let androidJson = [];
    let androidClientJson = [];
    let androidServerJson = [];
    let windowsJson = [];
    let otherJson = [];
    // 决定每个场景对应的sdk路径
    let sdkOptionalArr = [];
    arrlist.forEach((item) => {
        if (item.split('/')[0] === 'iOS') {
            iosJson.push(item);
            sdkOptionalArr[0] = '0';
        } else if (item.split('/')[0] === 'Android') {
            androidJson.push(item);
            sdkOptionalArr[1] = '1';
        } else if (item.split('/')[0] === 'Windows') {
            windowsJson.push(item);
            sdkOptionalArr[2] = '3';
        } else if (item.split('/')[0] === 'Android-Client') {
            androidClientJson.push(item);
            sdkOptionalArr[1] = '1';
        } else if (item.split('/')[0] === 'Android-Server') {
            androidServerJson.push(item);
            sdkOptionalArr[1] = '1';
        } else if (item.split('/')[0] === 'iOS-Client') {
            iosClientJson.push(item);
            sdkOptionalArr[0] = '0';
        }  else {
            otherJson.push(item);
        }
    });
    classifyArr.push({
        iosJson: iosJson,
        iosClientJson: iosClientJson,
        androidJson: androidJson,
        androidClientJson: androidClientJson,
        androidServerJson: androidServerJson,
        windowsJson: windowsJson,
        otherJson: otherJson,
        sdkOptionalArr: sdkOptionalArr,
    });
});
// console.log(classifyArr);
// [{
//         iosJson: ['iOS/2-LiveDemo5-RunningGuide.md',
//             'iOS/3-LiveDemo5-Experience.md',
//             'iOS/5-VideoLive-Implementation.md'
//         ],
//         androidJson: ['Android/2-LiveDemo5-RunningGuide.md',
//             'Android/3-LiveDemo5-Experience.md',
//             'Android/5-VideoLive-Implementation.md'
//         ],
//         windowsJson: ['Windows/2-LiveDemo5-RunningGuide.md',
//             'Windows/3-LiveDemo5-Experience.md',
//             'Windows/5-VideoLive-Implementation.md'
//         ],
//         otherJson: ['1-VideoLive-Overview.md'],
//         sdkOptionalArr: ['0', '1', '3']
//     },
//     {
//         iosJson: ['iOS/2-InstantTalk2-RunningGuide.md',
//             'iOS/3-InstantTalk2-Experience.md',
//             'iOS/5-InstantVideo-Implementation.md'
//         ],
//         androidJson: ['Android/2-InstantTalk2-RunningGuide.md',
//             'Android/3-InstantTalk2-Experience.md',
//             'Android/5-InstantVideo-Implementation.md'
//         ],
//         windowsJson: ['Windows/2-InstantTalk2-RunningGuide.md',
//             'Windows/3-InstantTalk2-Experience.md',
//             'Windows/5-InstantVideo-Implementation.md'
//         ],
//         otherJson: ['1-InstantVideo-Overview.md'],
//         sdkOptionalArr: ['0', '1', '3']
//     }
//     ···
// ]


// 经过sdk数据注入的json数据数组   ******** 最终导出的数据 *********
const solveJsonArr = [];

closestDirList.forEach((closestDirItem, index) => {
    solveJsonArr.push(closestDirItem.jsonData(zegoRoomSDK(closestDirItem.type, classifyArr[index].sdkOptionalArr)));
});    
// console.log(JSON.stringify(solveJsonArr));


// 有映射变量fileMapkey的，设置mdUrl属性，与sdk指引区分开
solveJsonArr.forEach((solveItem) => {
    solveItem.childNodes.forEach((fitem) => {
        if (fitem.fileMapKey) {
            fitem.mdUrl = [];
        }
    });
});
// console.log(JSON.stringify(solveJsonArr));

// 根据fileMapKey进行遍历对比，将md的路径一一对应放入mdUrl属性
classifyArr.forEach((item, index) => {
    serilize(item.iosJson, '0', index);
    serilize(item.iosClientJson, '0', index);
    serilize(item.androidJson, '1', index);
    serilize(item.androidClientJson, '1', index);
    serilize(item.androidServerJson, '4', index);
    serilize(item.windowsJson, '3', index);
    serilize(item.otherJson, '', index);
});
// console.log(JSON.stringify(solveJsonArr));

// 序列化
function serilize(typeJson, typeNum, index) {
    typeJson.forEach((typeItem) => {
        // 获取md文档文件名中的序号用来对比
        let curFileMapKey;
        let tempVal = typeItem.split('/');
        if (tempVal[1]) {
            curFileMapKey = tempVal[1].split('-')[0];
        } else {
            curFileMapKey = tempVal[0].split('-')[0];
        }
        // console.log(curFileMapKey);
        solveJsonArr[index].childNodes.forEach((solveItem) => {
            if (solveItem.fileMapKey == curFileMapKey) {
                solveItem.mdUrl.push({
                    type: typeNum,
                    url: dirList[index] + '/' + typeItem
                });
                return;
            }
        });
    });
}


// 删除fileMapKey属性
solveJsonArr.forEach((solveItem) => {
    solveItem.childNodes.forEach((fitem) => {
        if (fitem.fileMapKey) {
            delete fitem.fileMapKey;
        }
    });
});
console.log('solveObj = ', JSON.stringify(solveJsonArr));

solveJsonArr.push(faq);

const applicationsJson = {
    name: '应用场景',
    nodeNum: 'Application_Scenes',
    childNodes: solveJsonArr
};

module.exports = applicationsJson;
