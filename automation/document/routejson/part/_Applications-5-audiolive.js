// 应用场景-语音直播
function productJson(sdkJson) {
    // 最终产出数据
    let finalData = {
        name: '语音直播',
        nodeNum: 'Audio_Live',
        childNodes: [
            {
                name: '概述',
                nodeNum: 'Overview',
                fileMapKey: '1'
            },
            {
                name: 'Demo运行指引',
                nodeNum: 'Demo_Running_Guide',
                fileMapKey: '2'
            },
            // {
            //     name: 'Demo体验',
            //     nodeNum: 'Demo_Experience',
            //     fileMapKey: '3'
            // },
            sdkJson,
            // zegoaudioroomSDK(sdkOptionalArr),
            {
                name: '功能实现流程',
                nodeNum: 'Feature_Process',
                fileMapKey: '5'
            }
        ]
    };
    return finalData;
}

module.exports = productJson;