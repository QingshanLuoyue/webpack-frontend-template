// var markdownpdf = require("markdown-pdf"),
//     fs = require("fs");

// fs.createReadStream("../../src/static/docs/ZegoLiveRoom/iOS/1-iOS-ZegoLiveRoom-IntegrationGuide.md")
//     .pipe(markdownpdf())
//     .pipe(fs.createWriteStream("dd.pdf"));

// --- OR --- 

// markdownpdf().from("/path/to/document.md").to("/path/to/document.pdf", function() {
//     console.log("Done");
// });

// var markdownpdf = require("markdown-pdf");

// var options = {
//     remarkable: {
//         html: true,
//         breaks: true,
//         plugins: [require('remarkable-classy')],
//         syntax: ['footnote', 'sup', 'sub']
//     }
// };

// markdownpdf(options)
//     .from("./1-iOS-ZegoLiveRoom-IntegrationGuide.md")
//     .to("ee.pdf", function() { console.log("Done"); });


const rm = require('rimraf');

var markdownpdf = require("markdown-pdf-marked"),
    split = require("split"), 
    through = require("through"), 
    duplexer = require("duplexer");

var util = require('./util.js');
var path = require('path');

var dirConfig = require('./dirConfig.js');
var dirJson = require('./dirJson.js');
// md文档读取目录
var docReadDirList = dirConfig.docReadDirList;
// pdf生成目录
var pdfProductDirList = dirConfig.pdfProductDirList;


// 根据 每一个md文档读取目录 读取到的路径数组
var docFilePathList = [];

docReadDirList.forEach((item) => {
    docFilePathList.push(util.getDirectory(item));
});
console.log('docFilePathList = ',docFilePathList);

// 最终pdf生成路径数组
var pdfProductPathList = [];
docFilePathList.forEach(function(docFilePathItem, index) {
    pdfProductPathList[index] = [];
    docFilePathItem.forEach((singlePathItem) => {
        var curd = singlePathItem.replace(new RegExp(docReadDirList[index]), '').replace(/\.md/, '.pdf');
        pdfProductPathList[index].push(pdfProductDirList[index] + curd);
    });
});
// console.log(pdfProductPathList);

var options = {
    // cssPath: '../../dist/static/css/document/index.16052dabf743ebf50f89f7dbf8857d4b.css',
    // highlightCssPath: '../../dist/static/css/document/index.16052dabf743ebf50f89f7dbf8857d4b.css',
    preProcessMd: preProcessMd
};

rm(path.resolve(__dirname, dirJson.commonpdf_prefix + '/*'), err => {
    if (err) {
        throw err;
    }
    docFilePathList.forEach((docFilePathItem, index) => {
        var curPdfPath = pdfProductPathList[index];
        markdownpdf(options).from(docFilePathItem).to(curPdfPath, function() {
            curPdfPath.forEach(function(d) { console.log("Created", d); });
        });
    });
});



// 处理获取图片
function preProcessMd() {
    // Split the input stream by lines
    var splitter = split();

    // Replace occurences of "foo" with "bar"
    var replacer = through(function(data) {
        // console.log(data);
        var picUrl = path.resolve(__dirname, '../../src');
        this.queue(data.replace(/\/static\/docs\/Pics/g, picUrl+ "/static/docs/Pics") + "\n");
        // this.queue(data.replace(/\/static\/docs\/Pics/g, "http://localhost:8080/static/docs/Pics") + "\n");
    });

    splitter.pipe(replacer);
    return duplexer(splitter, replacer);
}
