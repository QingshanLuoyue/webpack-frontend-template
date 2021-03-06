// API说明
const api = require('./_API.js')('audio');
// 常见错误码
const errorCode = require('./_ErrorCode.js');
// 常见问题
const faq = require('../_FAQ.js');


// 最终产出数据
let finalData = {
    name: '实时语音',
    nodeNum: 'Audio_Room',
    childNodes: [
        {
            name: 'SDK集成指引',
            nodeNum: 'SDK_Integration_Guide',
            fileMapKey: '1'
        },
        {
            name: '初级功能指南',
            nodeNum: 'Basic_Feature_Guide',
            childNodes: [
                {
                    name: '初始化',
                    nodeNum: 'Initialization',
                    fileMapKey: '2.1'
                },
                {
                    name: '自动发布直播',
                    nodeNum: 'AutoPublish',
                    fileMapKey: '2.2'
                },
                {
                    name: '手动发布直播',
                    nodeNum: 'ManualPublish',
                    fileMapKey: '2.3'
                },
                {
                    name: '播放直播',
                    nodeNum: 'Play',
                    fileMapKey: '2.4'
                }
            ]
        },
        {
            name: '高级功能指南',
            nodeNum: 'Advanced_Feature_Guide',
            childNodes: [
                {
                    name: 'IM使用',
                    nodeNum: 'IM',
                    fileMapKey: '3.1'
                },
                {
                    name: '打断事件处理',
                    nodeNum: 'Interruptions',
                    fileMapKey: '3.2'
                },
                {
                    name: '混音',
                    nodeNum: 'Aux',
                    fileMapKey: '3.3'
                },
                {
                    name: '音频前处理',
                    nodeNum: 'AudioPrep',
                    fileMapKey: '3.4'
                },
                {
                    name: '音频录制',
                    nodeNum: 'AudioRecord',
                    fileMapKey: '3.5'
                },
                {
                    name: '音频外部采集与渲染',
                    nodeNum: 'AudioCaptureAndRender',
                    fileMapKey: '3.6'
                },
                {
                    name: '双声道',
                    nodeNum: 'Stereo',
                    fileMapKey: '3.7'
                }
            ]
        },
        api,
        errorCode,
        faq
    ]
};


module.exports = finalData;