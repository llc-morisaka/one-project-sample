import { defineEventHandler, readMultipartFormData, createError } from 'h3';
import fs from 'fs/promises';
import path from 'path';

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event);
  if (!files || files.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No files uploaded' });
  }

  const uploadDir = path.resolve('server/data');
  await fs.mkdir(uploadDir, { recursive: true });

  for (const file of files) {
    if (!file.filename || !file.data) continue;

    // ファイル名を正規化
    const safeFilename = file.filename.normalize("NFC");
    const filePath = path.join(uploadDir, safeFilename);

    // 親ディレクトリを作成
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    // ファイルを書き込む
    await fs.writeFile(filePath, file.data);
    console.log(`Saved: ${filePath}`);
  }

  return { message: 'Upload 成功したよ' };
});
