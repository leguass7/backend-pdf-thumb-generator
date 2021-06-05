import { Router, Request, Response, NextFunction, static as expressStatic } from 'express'
import { multerUploadFile } from '../middlewares'
import { uploadFiles } from '../config/static'
import PdfController from '../controllers/pdf'

const routes = Router()

routes.use(uploadFiles.route, expressStatic(uploadFiles.path))

routes.post('/pdf', multerUploadFile, PdfController.upload)

routes.all('/', (_req: Request, res: Response, _next: NextFunction) => {
  res.status(200).send({ data: "Hello world, i'm working" })
})

export default routes
