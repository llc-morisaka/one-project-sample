import { defineEventHandler } from 'h3';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(() => {
  const baseDir = 'server/data';
  const items = fs.readdirSync(baseDir);

  const result = items.filter(item => item !== "users.ts").map((item) => {
    if (item != "users.ts") {
      const itemPath = path.join(baseDir, item);
      const isDirectory = fs.statSync(itemPath).isDirectory();

      if (isDirectory) {
        // フォルダの場合は、その中のファイル一覧も取得
        const folderFiles = fs.readdirSync(itemPath).map((file) => ({
          name: file,
          path: `${item}/${file}`,
        }));

        return {
          name: item,
          isDirectory: true,
          files: folderFiles,
        };
      } else {
        return {
          name: item,
          isDirectory: false,
          path: item,
        };
      }
    } else {
      console.log("item>>",item);
    }

  });

  return { items: result };
});
