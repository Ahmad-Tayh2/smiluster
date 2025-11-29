const multer = require('multer');
import * as path from 'path';
import { Request } from 'express';
import { UUID } from 'sequelize';

const date = Date.now();
UUID;
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    if (path.extname(file.originalname).toLowerCase() === '.pdf')
      cb(null, path.join(__dirname, '../../public/files'));
    else cb(null, path.join(__dirname, '../../public/images'));
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const fileName = `${
      file.originalname.split(path.extname(file.originalname))[0]
    }-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export = upload;
