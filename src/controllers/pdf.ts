import { Request, Response } from 'express'
import pdfThumbGenerate from '../helpers/pdfThumbGenerate'
import { uploadFiles } from '../config/static'
import { parse, join } from 'path'

class PdfController {
  /**
   * POST
   * @method upload
   */
  async upload(req: Request, res: Response): Promise<void> {
    const { file } = req

    const parseFile = parse(file.path)
    const fileName = `${parseFile.name}.png`
    const output = join(`${parseFile.dir}`, fileName)

    const thumbPath = await pdfThumbGenerate(file.path, output)

    const result = {
      success: true,
      thumbnail: `${uploadFiles.route}/${fileName}`,
      thumbPath,
      fileUrl: `${uploadFiles.route}/${file.filename}`,
      filePath: file.path
    }

    return res.status(201).send(result).end()
  }
}

export default new PdfController()
