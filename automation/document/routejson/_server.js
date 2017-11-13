const path = require('path');
const util = require('../config/util.js');

const server_prefix = '/static/docs';


// 各场景json数据
const serverJson  = require('../routejson/part/_serverJson.js');

// 最接近文件的目录数组
const closestDirList = [
    // server
    {
        name: '/server',
        jsonData: serverJson
    }
];

// 目录数组
const dirList = [];
closestDirList.forEach((item) => {
    dirList.push(server_prefix + item.name);
});
// console.log(dirList);
// [
//     '/static/docs/server',
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
//     ['1.1-applications.md',
//         '1.2-createCallback.md',
//         '1.3-closeCallback.md',
//         '1.4-replayCallback.md',
//         '1.5-mixStreamStartCallback.md',
//         '1.6-mixStreamEndCallback.md',
//         '1.7-enterRoomCallback.md',
//         '1.8-quitRoomCallback.md',
//         '1.9-checkSignature.md',
//         '2.1-usingScenes.md',
//         '2.10-deleteObjects.md',
//         '2.100-testwebapi.md',
//         '2.111-globalReturnCode.md',
//         '2.2-getAccesstoken.md',
//         '2.3-createLive.md',
//         '2.4-closeLive.md',
//         '2.5-forbidLive.md',
//         '2.6-resumeLive.md',
//         '2.7-startMix.md',
//         '2.8-stopMix.md',
//         '2.9-createLiveRecord.md',
//         '3.1-getLiveroomToken.md',
//         '3.2-getLiveroomUserlist.md',
//         '3.3-sendLiveroomCustomMsg.md',
//         '4.1-InstantTalkUserGuide.md',
//         '4.2-MoreAnchorUserGuide.md'
//     ]
// ]

//  ******** 最终导出的数据 *********
const solveJsonArr = [];
closestDirList.forEach((closestDirItem) => {
    solveJsonArr.push(closestDirItem.jsonData);
}); 

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
// console.log(solveJsonArr);


// 根据fileMapKey进行遍历对比，将md的路径一一对应放入mdUrl属性
fileUrlGroupList.forEach((item, index) => {
    serilize(item, '', index);
});

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
    solveItem.childNodes.forEach((fitem) => {
        if (fitem.childNodes && fitem.childNodes.length != 0) {
            fitem.childNodes.forEach((sitem) => {
                if (sitem.fileMapKey) {
                    delete sitem.fileMapKey;
                }
            });
        } else {
            if (fitem.fileMapKey) {
                delete fitem.fileMapKey;
            }
        }
    });
});
console.log('solveObj = ', JSON.stringify(solveJsonArr));

module.exports = solveJsonArr;