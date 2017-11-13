let finalData = {
    name: '后台文档',
    nodeNum: 'ServerDocument',
    childNodes: [
        {
            name: '回调说明',
            nodeNum: 'Callback_Instructions',
            childNodes: [
                {
                    name: '使用场景',
                    nodeNum: 'applications',
                    fileMapKey: '1.1'
                },
                {
                    name: '流创建回调说明',
                    nodeNum: 'createCallback',
                    fileMapKey: '1.2'
                }, 
                {
                    name: '流关闭回调说明',
                    nodeNum: 'closeCallback',
                    fileMapKey: '1.3'
                }, 
                {
                    name: '回看地址生成回调说明',
                    nodeNum: 'replayCallback',
                    fileMapKey: '1.4'
                }, 
                {
                    name: '混流开始回调说明',
                    nodeNum: 'mixStreamStartCallback',
                    fileMapKey: '1.5'
                }, 
                {
                    name: '混流结束回调说明',
                    nodeNum: 'mixStreamEndCallback',
                    fileMapKey: '1.6'
                },
                // {
                //     name: '登陆房间回调说明',
                //     nodeNum: 'enterRoomCallback',
                //     fileMapKey: '1.7'
                // }, 
                // {
                //     name: '退出房间回调说明',
                //     nodeNum: 'quitRoomCallback',
                //     fileMapKey: '1.8'
                // },
                {
                    name: '转推开始回调',
                    nodeNum: 'turnPushStartCallback',
                    fileMapKey: '1.10'
                },
                {
                    name: '转推结束回调',
                    nodeNum: 'turnPushStopCallback',
                    fileMapKey: '1.11'
                },
                {
                    name: '检验说明',
                    nodeNum: 'checkSignature',
                    fileMapKey: '1.9'
                },
            ]
        },
        {
            name: '外部推流接入指南',
            nodeNum: 'External_Plug_Flow_Guide',
            childNodes: [
                {
                    name: '使用场景',
                    nodeNum: 'ApplicableScenes',
                    fileMapKey: '2.1'
                }, 
                {
                    name: '获取票据接口',
                    nodeNum: 'GetToken',
                    fileMapKey: '2.2'
                }, 
                {
                    name: '创建直播接口',
                    nodeNum: 'CreateLive',
                    fileMapKey: '2.3'
                }, 
                {
                    name: '关闭直播接口',
                    nodeNum: 'CloseLive',
                    fileMapKey: '2.4'
                }, 
                {
                    name: '禁止直播接口',
                    nodeNum: 'ForbidLive',
                    fileMapKey: '2.5'
                }, 
                {
                    name: '恢复直播接口',
                    nodeNum: 'ResumeLive',
                    fileMapKey: '2.6'
                },
                {
                    name: 'UDP禁止直播接口',
                    nodeNum: 'ForbidUDPLive',
                    fileMapKey: '2.11'
                },
                {
                    name: 'UDP恢复直播接口',
                    nodeNum: 'ResumeUDPLive',
                    fileMapKey: '2.12'
                },
                {
                    name: '开始混流接口',
                    nodeNum: 'StartMix',
                    fileMapKey: '2.7'
                },
                {
                    name: '停止混流接口',
                    nodeNum: 'StopMix',
                    fileMapKey: '2.8'
                }, 
                {
                    name: '创建录制索引文件接口',
                    nodeNum: 'CreateLiveRecord',
                    fileMapKey: '2.9'
                },
                {
                    name: '删除录制文件接口',
                    nodeNum: 'DeleteObjects',
                    fileMapKey: '2.10'
                },
                {
                    name: '测试环境说明',
                    nodeNum: 'TestInstructions',
                    fileMapKey: '2.100'
                }, 
                {
                    name: '全局返回码说明',
                    nodeNum: 'ErrorCode',
                    fileMapKey: '2.111'
                }
            ]
        },
        // {
        //     name: '房间后台接入指南',
        //     nodeNum: 'Liveroom_Server_Interface_Guide',
        //     childNodes: [
        //         {
        //             name: '获取票据接口',
        //             nodeNum: 'getLiveroomToken',
        //             fileMapKey: '3.1'
        //         },
        //         {
        //             name: '获取房间用户列表接口',
        //             nodeNum: 'getLiveroomUserlist',
        //             fileMapKey: '3.2'
        //         },
        //         {
        //             name: '房间内推送自定义消息接口',
        //             nodeNum: 'sendLiveroomCustomMsg',
        //             fileMapKey: '3.3'
        //         }
        //     ]
        // },
        {
            name: '控制台使用指南',
            nodeNum: 'DeveloperUserGuide',
            childNodes: [
                {
                    name: '实时音视频',
                    nodeNum: 'InstantTalkUserGuide',
                    fileMapKey: '4.1'
                },
                {
                    name: '连麦直播',
                    nodeNum: 'MoreAnchorUserGuide',
                    fileMapKey: '4.2'
                },
                {
                    name: '娃娃机',
                    nodeNum: 'WaWaJi',
                    fileMapKey: '4.3'
                },
            ]
        }
    ]
};

module.exports = finalData;