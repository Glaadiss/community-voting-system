import { writeFile, readFile, mkdir } from 'fs';
import { resolve } from 'path';

interface Response {
  type?: string;
  data?: Buffer;
}

function getPath(id) {
  return resolve(process.cwd()) + '/assets/' + id + '.pdf';
}

function decodeBase64Image(dataString): Response {
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const response: Response = {};

  if (matches.length !== 3) {
    return null;
  }
  response.type = matches[1];
  response.data = Buffer.from(matches[2], 'base64');

  return response;
}

export function getDocument(projectId: string) {
  return new Promise((resolv, reject) => {
    readFile(getPath(projectId), (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolv(data);
    });
  });
}

export function initAssets(cb) {
  mkdir(process.cwd() + '/assets', err => {
    // folder exist
    cb();
  });
}

export function saveDocument(base64File: string, projectId: string) {
  const imageBuffer = decodeBase64Image(base64File);
  return new Promise((resolv, reject) => {
    writeFile(getPath(projectId), imageBuffer.data, err => {
      if (err) {
        return reject(err);
      }
      resolv();
    });
  });
}
