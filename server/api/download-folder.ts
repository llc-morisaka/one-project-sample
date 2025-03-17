import { defineEventHandler, getQuery, sendStream } from 'h3';
import archiver from 'archiver';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const folderName = query.folder;

  if (typeof folderName !== 'string') {
    event.node.res.writeHead(400, { 'Content-Type': 'application/json' });
    event.node.res.end(JSON.stringify({ error: 'Invalid folder name' }));
    return;
  }

  const folderPath = path.resolve('server/data', folderName);

  if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) {
    event.node.res.writeHead(404, { 'Content-Type': 'application/json' });
    event.node.res.end(JSON.stringify({ error: 'Folder not found' }));
    return;
  }

  // ZIPストリームを作成
  const archive = archiver('zip', { zlib: { level: 9 } });

  // HTTPレスポンスヘッダーを適切に設定
  event.node.res.writeHead(200, {
    'Content-Disposition': `attachment; filename="${encodeURIComponent(folderName)}.zip"`,
    'Content-Type': 'application/zip',
  });

  archive.directory(folderPath, false);
  archive.finalize();

  return sendStream(event, archive);
});
