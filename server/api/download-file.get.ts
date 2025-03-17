import { defineEventHandler, sendStream, getQuery } from 'h3';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  console.log("ダウンロードを開始します");

  const query = getQuery(event);
  const filename = query.filename;

  // filename の型チェック
  if (typeof filename !== 'string') {
    return { error: 'Invalid filename' };
  }

  const filePath = path.resolve('server/data', filename);

  // ファイルが存在しない場合のエラーハンドリング
  if (!fs.existsSync(filePath)) {
    return { error: 'File not found' };
  }

  // **Content-Disposition ヘッダーを追加**
  event.node.res.setHeader(
    'Content-Disposition',
    `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`
  );

  return sendStream(event, fs.createReadStream(filePath));
});
