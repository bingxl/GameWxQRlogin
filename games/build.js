const fs = require('fs');
const path = require('path');

const jsonDir = path.join(__dirname, "list"); // 替换为你的JSON文件夹路径
const inputFile = path.join(__dirname, 'gameList.json');
const outputFile = path.join(__dirname, 'gameList-min.json');
const versionFile = path.join(__dirname, 'version.json');
let menuVersion = 9;

function gameListMin(games) {
  // 读取JSON文件
  const jsonData = fs.readFileSync(inputFile, 'utf8');

  // 解析JSON（确保格式正确）
  const parsedJson = JSON.parse(jsonData);
  menuVersion = parsedJson.version;
  parsedJson.game = games;
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


/**
 * 获取文件夹下所有JSON文件路径
 * @param {string} dirPath 文件夹路径
 * @returns {Promise<string[]>} JSON文件路径数组
 */
async function getAllJsonFiles(dirPath) {
  try {
    const files = await fs.promises.readdir(dirPath);
    return files
      .filter(file => path.extname(file).toLowerCase() === '.json')
      .map(file => path.join(dirPath, file));
  } catch (error) {
    throw new Error(`读取文件夹 ${dirPath} 失败: ${error.message}`);
  }
}

/**
 * 合并多个JSON文件，检查bundleId重复
 * @param {string[]} filePaths 要合并的JSON文件路径数组
 * @returns {Promise<Object[]>} 合并后的对象数组
 * @throws {Error} 如果发现重复的bundleId
 */
async function mergeJsonFilesWithBundleIdCheck(filePaths) {
  const mergedData = [];
  const bundleIdSet = new Set();

  for (const filePath of filePaths) {
    try {
      // 1. 读取文件内容
      const fileContent = await fs.promises.readFile(filePath, 'utf8');

      // 2. 解析JSON
      const jsonArray = JSON.parse(fileContent);

      // 3. 检查是否为数组
      if (!Array.isArray(jsonArray)) {
        throw new Error(`文件 ${path.basename(filePath)} 不包含有效的对象数组`);
      }

      // 4. 处理每个对象
      for (const obj of jsonArray) {
        // 检查bundleId是否存在
        if (obj.bundleId) {
          if (bundleIdSet.has(obj.bundleId)) {
            throw new Error(`发现重复的bundleId: ${obj.bundleId} (文件: ${path.basename(filePath)})`);
          }
          bundleIdSet.add(obj.bundleId);
        }

        mergedData.push(obj);
      }

    } catch (error) {
      // 捕获并重新抛出错误，包含文件名信息
      throw new Error(`处理文件 ${path.basename(filePath)} 时出错: ${error.message}`);
    }
  }

  return mergedData;
}

// 使用示例
async function merge() {
  try {
    // 1. 获取文件夹下所有JSON文件
    const jsonFiles = await getAllJsonFiles(jsonDir);

    if (jsonFiles.length === 0) {
      console.log('指定文件夹中没有找到JSON文件');
      return;
    }

    // console.log('找到以下JSON文件:', jsonFiles.map(f => path.basename(f)).join(', '));

    // 2. 合并文件并检查重复
    const mergedResult = await mergeJsonFilesWithBundleIdCheck(jsonFiles);

    // 3. 输出合并结果或保存到文件
    console.log('成功合并文件，共合并', mergedResult.length, '个对象');

    // 4. 保存合并后的结果到文件
    gameListMin(mergedResult);

  } catch (error) {
    console.error('处理过程中出错:', error.message);
    process.exit(1); // 非零退出码表示错误
  }
};

// 执行合并和版本修改
(async () => {
  await merge();
  modifyMenuVersion();
}
)();
