/**
 * fix-rsc-paths.js
 * 
 * Next.js 静态导出时，RSC 数据文件存放在嵌套目录中，例如：
 *   out/ai-assistant/godmode/__next.$d$category/$d$slug.txt
 * 
 * 但浏览器请求的是"点分隔"的平级路径：
 *   /ai-assistant/godmode/__next.$d$category.$d$slug.txt
 * 
 * 本脚本会遍历 out 目录，为所有嵌套的 RSC 数据文件
 * 在对应页面目录下创建点分隔的平级副本，解决 404 报错。
 */

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out');
let createdCount = 0;

/**
 * 递归遍历 out 目录，找到所有 __next.* 目录并处理
 */
function processDirectory(dir) {
  let items;
  try {
    items = fs.readdirSync(dir);
  } catch (e) {
    return;
  }

  for (const item of items) {
    const itemPath = path.join(dir, item);

    let stat;
    try {
      stat = fs.statSync(itemPath);
    } catch (e) {
      continue;
    }

    if (stat.isDirectory()) {
      // 找到 __next.$d$... 目录（动态路由的 RSC 数据目录）
      if (item.startsWith('__next.') && !item.startsWith('__next._')) {
        createFlatCopies(dir, item, itemPath);
      } else {
        // 普通目录，继续递归查找
        processDirectory(itemPath);
      }
    }
  }
}

/**
 * 将 RSC 目录内的嵌套文件，在 baseDir 中创建点分隔的平级副本
 * @param {string} baseDir  - 页面目录（存放平级副本的位置）
 * @param {string} prefix   - 当前累积的路径前缀（如 __next.$d$category）
 * @param {string} srcDir   - 当前正在处理的源目录
 */
function createFlatCopies(baseDir, prefix, srcDir) {
  let items;
  try {
    items = fs.readdirSync(srcDir);
  } catch (e) {
    return;
  }

  for (const item of items) {
    const itemPath = path.join(srcDir, item);

    let stat;
    try {
      stat = fs.statSync(itemPath);
    } catch (e) {
      continue;
    }

    if (stat.isFile()) {
      // 去掉文件的 .txt 后缀，作为路径段名称
      const segmentName = item.endsWith('.txt') ? item.slice(0, -4) : item;
      const flatFileName = `${prefix}.${segmentName}.txt`;
      const flatFilePath = path.join(baseDir, flatFileName);

      if (!fs.existsSync(flatFilePath)) {
        try {
          fs.copyFileSync(itemPath, flatFilePath);
          createdCount++;
          const rel = flatFilePath.replace(outDir, '').replace(/\\/g, '/');
          console.log(`  ✓ ${rel}`);
        } catch (e) {
          console.warn(`  ✗ Failed to copy: ${flatFilePath}`, e.message);
        }
      }
    } else if (stat.isDirectory()) {
      // 子目录：把目录名加入前缀，继续递归
      createFlatCopies(baseDir, `${prefix}.${item}`, itemPath);
    }
  }
}

console.log('🔧 Fixing RSC paths for static export...');
processDirectory(outDir);
console.log(`✅ Done! Created ${createdCount} flat RSC data files.`);
