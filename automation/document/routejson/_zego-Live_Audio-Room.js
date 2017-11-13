const path = require('path');
const util = require('../config/util.js');

const applications_prefix = '/static/docs';

// // 各场景json数据
const zegoAudioRoom = require('../routejson/part/_ZegoAudioRoom.js');
const zegoLiveRoom  = require('../routejson/part/_ZegoLiveRoom.js');

// 要忽略文档路径列表
let audioIgnoreFileArr = [
    path.resolve(__dirname, '../../../src/static/docs/ZegoAudioRoom/Windows/3.2-windows-ZegoAudioRoom-Interruption.md')
];


// 最接近文件的目录数组
const closestDirList = [
    // zegoLiveRoom
    {
        name: '/ZegoLiveRoom',
        jsonData: zegoLiveRoom,
        ignoreArr: ''
    },
    // zegoAudioRoom
    {
        name: '/ZegoAudioRoom',
        jsonData: zegoAudioRoom,
        ignoreArr: audioIgnoreFileArr
    },
];

// 目录数组
const dirList = [];
closestDirList.forEach((item) => {
    dirList.push(applications_prefix + item.name);
});
// console.log(dirList);
// [
//     '/static/docs/ZegoAudioRoom',
//     '/static/docs/ZegoLiveRoom',
// ]



// 获取到的文档路径列表
const fileUrlGroupList = [];
const mainSearchDir = path.resolve(__dirname, '../../../src');
dirList.forEach((item, index) => {
    let curFileList = util.getDirectory(mainSearchDir + item, closestDirList[index].ignoreArr, new RegExp('^.+' + closestDirList[index].name + '/'));
    fileUrlGroupList.push(curFileList);
});
// console.log(fileUrlGroupList);
// [
//     ['Android/1-Android-ZegoAudioRoom-IntegrationGuide.md',
//         'Windows/1-windows-ZegoAudioRoom-IntegrationGuide.md',
//         'Windows/3.7-windows-ZegoAudioRoom-Stereo.md',
//         'iOS/1-iOS-ZegoAudioRoom-IntegrationGuide.md',
//         'iOS/3.7-iOS-ZegoAudioRoom-Stereo.md'
//     ],
//     ['Android/1-Android-ZegoLiveRoom-IntegrationGuide.md',
//         'Windows/1-windows-ZegoLiveRoom-IntegrationGuide.md',
//         'iOS/1-iOS-ZegoLiveRoom-IntegrationGuide.md',
//         'iOS/3.9-iOS-ZegoLiveRoom-Stereo.md'
//     ]
// ]



// 根据ios／android／window分类后的文档路径数组
const classifyArr = [];
fileUrlGroupList.forEach((arrlist) => {
    let iosJson = [];
    let androidJson = [];
    let windowsJson = [];
    let otherJson = [];
    arrlist.forEach((item) => {
        if (item.split('/')[0] === 'iOS') {
            iosJson.push(item);
        } else if (item.split('/')[0] === 'Android') {
            androidJson.push(item);
        } else if (item.split('/')[0] === 'Windows') {
            windowsJson.push(item);
        } else {
            otherJson.push(item);
        }
    });
    classifyArr.push({
        iosJson: iosJson,
        androidJson: androidJson,
        windowsJson: windowsJson,
        otherJson: otherJson,
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
//     }
//     ···
// ]


//  ******** 最终导出的数据 *********
const solveJsonArr = [];

closestDirList.forEach((closestDirItem) => {
    solveJsonArr.push(closestDirItem.jsonData);
});    
// console.log(JSON.stringify(solveJsonArr));


// 有映射变量fileMapkey的，设置mdUrl属性，与sdk指引区分开
solveJsonArr.forEach((solveItem) => {
    solveItem.childNodes.forEach((fitem) => {
        if (fitem.childNodes && fitem.childNodes.length != 0) {
            fitem.childNodes.forEach((sitem) => {
                if (sitem.fileMapKey) {
                    sitem.mdUrl = [];
                }
            });
        } else {
            if (fitem.fileMapKey) {
                fitem.onlyMdUrl = [];
            }
        }
    });
});
// console.log(JSON.stringify(solveJsonArr));

// 根据fileMapKey进行遍历对比，将md的路径一一对应放入mdUrl属性
classifyArr.forEach((item, index) => {
    serilize(item.otherJson, '', index);
    serilize(item.iosJson, '0', index);
    serilize(item.androidJson, '1', index);
    serilize(item.windowsJson, '3', index);
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
            if (solveItem.childNodes && solveItem.childNodes.length != 0) {
                solveItem.childNodes.forEach((childItem) => {
                    if (childItem.fileMapKey == curFileMapKey) {
                        childItem.mdUrl.push({
                            type: typeNum,
                            url: dirList[index] + '/' + typeItem
                        });
                        return;
                    }
                });
            } else {
                if (solveItem.fileMapKey == curFileMapKey) {
                    solveItem.onlyMdUrl.push({
                        type: typeNum,
                        url: dirList[index] + '/' + typeItem
                    });
                    return;
                }
            }
        });
    });
}


// 删除fileMapKey属性
solveJsonArr.forEach((solveItem) => {
    solveItem.childNodes.forEach((item) => {
        if (item.childNodes && item.childNodes.length != 0) {
            item.childNodes.forEach((childItem) => {
                if (childItem.fileMapKey) {
                    delete childItem.fileMapKey;
                }
            });
        } else {
            if (item.fileMapKey) {
                delete item.fileMapKey;
            }
        }
    });
});
// console.log('solveObj = ', JSON.stringify(solveJsonArr));


module.exports = solveJsonArr;
