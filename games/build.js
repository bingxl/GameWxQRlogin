const fs = require('fs');

const inputFile = 'gameList.json';
const outputFile = 'gameList-min.json';
const versionFile = 'version.json';
let menuVersion = 9;

function gameListMin() {
    // 读取JSON文件
    const jsonData = fs.readFileSync(inputFile, 'utf8');

    // 解析JSON（确保格式正确）
    const parsedJson = JSON.parse(jsonData);
    menuVersion = parsedJson.version;
    // 压缩JSON（JSON.stringify默认不包含空格）
    const minifiedJson = JSON.stringify(parsedJson);
    // 写入压缩后的JSON文件
    fs.writeFileSync(outputFile, minifiedJson, 'utf8');

    console.log('JSON 已压缩并保存为 ' + outputFile);
}

function modifyMenuVersion() {
    // 读取version.json文件
    const versionData = fs.readFileSync(versionFile, 'utf8');

    // 解析JSON（确保格式正确）
    const parsedVersionJson = JSON.parse(versionData);

    // 修改version字段
    parsedVersionJson.menuVersion = menuVersion;

    // 写入修改后的JSON文件
    fs.writeFileSync(versionFile, JSON.stringify(parsedVersionJson), 'utf8');

    console.log('version.json 已更新');
}

gameListMin();
modifyMenuVersion();
