import { NextFunction, Request, Response } from 'express'
import multer, { DiskStorageOptions, Options } from 'multer'
import { extname } from 'path'
import { uploadFiles } from '../../config/static'
import getMulterError from './getMulterError'

function timeStamp(): string {
  return (+new Date()).toString(16)
}

const filename: DiskStorageOptions['filename'] = (_req, file, cb) => {
  const name = `file-${timeStamp()}${extname(file.originalname)}`
  cb(null, name)
}

const fileFilter: Options['fileFilter'] = (_req, file, cb) => {
  const { allowedMimes } = uploadFiles
  const allowed = !!allowedMimes.includes(file.mimetype)
  return allowed
    ? cb(null, allowed)
    : cb(new Error(`Tipo de arquivo n\u00e3o permitido ${file.mimetype}`))
}

const multerConfigFile: Options = {
  dest: uploadFiles.path,
  storage: multer.diskStorage({
    destination: uploadFiles.path,
    filename
  }),
  limits: uploadFiles.limits,
  fileFilter
}

/**
 * Middleware para upload de arquivo PDF
 * @function multerUploadFile
 */
export default function multerUploadFile(req: Request, res: Response, next: NextFunction): void {
  const upload = multer(multerConfigFile).single('file')

  return upload(req, res, (err: any) => {
    const message = err && getMulterError(req, err, uploadFiles.limits.fileSize)
    if (message) return res.status(401).send({ message }).end()
    return next()
  })
}
