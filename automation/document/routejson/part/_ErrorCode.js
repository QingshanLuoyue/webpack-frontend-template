// 常见错误码
const filePath = require('../../config/_global.js');
const faq = filePath.errorcode_doc_prefix;

const errorCodeJson = {
    name: '常见错误码',
    nodeNum: 'Error_Code',
    onlyMdUrl: [
        { type: '', url: faq + '9-codes' + '.md' }
    ]
};

module.exports = errorCodeJson;
