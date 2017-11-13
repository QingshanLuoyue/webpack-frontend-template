// _ZegoAudioRoom-SDK集成指引
const filePath = require('../../config/_global.js');

// audio
const zegoaudioroom_ios = filePath.zegoaudioroom_ios_doc_prefix;
const zegoaudioroom_android = filePath.zegoaudioroom_android_doc_prefix;
const zegoaudioroom_windows = filePath.zegoaudioroom_windows_doc_prefix;

// live
const zegoliveroom_ios = filePath.zegoliveroom_ios_doc_prefix;
const zegoliveroom_android = filePath.zegoliveroom_android_doc_prefix;
const zegoliveroom_windows = filePath.zegoliveroom_windows_doc_prefix;


const json = {
    name: 'SDK集成指引',
    nodeNum: 'SDK_Integration_Guide',
    mdUrl: []
};

const sdkMap = {
    'audio': {
        '0' : zegoaudioroom_ios + '1-iOS-ZegoAudioRoom-IntegrationGuide' + '.md',
        '1' : zegoaudioroom_android + '1-Android-ZegoAudioRoom-IntegrationGuide' + '.md',
        '3' : zegoaudioroom_windows + '1-windows-ZegoAudioRoom-IntegrationGuide' + '.md'
    },
    'live': {
        '0' : zegoliveroom_ios + '1-iOS-ZegoLiveRoom-IntegrationGuide' + '.md',
        '1' : zegoliveroom_android + '1-Android-ZegoLiveRoom-IntegrationGuide' + '.md',
        '3' : zegoliveroom_windows + '1-windows-ZegoLiveRoom-IntegrationGuide' + '.md'
    }
};

const zegoAudioRoomSDKJson = function(sdkType, platArr) {
    let stringifyJson = JSON.parse(JSON.stringify(json));
    platArr.forEach((item) => {
        stringifyJson.mdUrl.push({
            type: item,
            url: sdkMap[sdkType][item]
        });
    });
    return stringifyJson;
};

module.exports = zegoAudioRoomSDKJson;
