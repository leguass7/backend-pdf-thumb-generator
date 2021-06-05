import { Request } from 'express'
import { MulterError } from 'multer'

export default function getMulterError(req: Request, err: any, limits?: number): string | null {
  if (err && err instanceof MulterError) {
    // FILE SIZE ERROR
    return limits ? `Tamnho m\u00e1ximo de arquivo permitido ${limits}` : 'Arquivo muito grande'
  } else if (err) {
    // INVALID FILE TYPE, message will return from fileFilter callback
    return err.message
  } else if (!req.file) {
    // FILE NOT SELECTED
    return 'File is required'
  }
  return null
}
