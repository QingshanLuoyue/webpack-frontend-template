// api
const filePath = require('../../config/_global.js');
const api = filePath.api_doc_prefix;

const json = {
    name: 'API说明',
    nodeNum: 'API_Instructions',
    onlyMdUrl: []
};

const apiMap = {
    'live' : api + 'ZegoLiveRoom-Index-Page' + '.md',
    'audio' : api + 'ZegoAudioRoom-Index-Page' + '.md'
};

const apiJson = function(type) {
    let stringifyJson = JSON.parse(JSON.stringify(json));
    stringifyJson.onlyMdUrl.push({
        type: '',
        url: apiMap[type]
    });
    return stringifyJson;
};

module.exports = apiJson;