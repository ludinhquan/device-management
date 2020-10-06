import fs from 'fs';
import path from 'path';

export const privateKey = fs.readFileSync(path.join(__dirname, '../private/key.pem')).toString();
export const certificate = fs.readFileSync(path.join(__dirname, '../private/cert.pem')).toString();