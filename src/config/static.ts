import { join, resolve } from 'path'

export const rootDir = resolve(__dirname, '../../')
export const pathVolume = join(rootDir, 'volumes')
export const pathStatic = join(pathVolume, 'assets')
export const routeStatic = '/assets'

export interface IUploadConfig {
  path: string
  allowedMimes: string[]
  limits: { fileSize: number }
  route: string
}

export const uploadFiles: IUploadConfig = {
  path: resolve(pathStatic, 'files'),
  allowedMimes: ['application/pdf'],
  limits: { fileSize: 2 * 1024 * 1024 },
  route: `${routeStatic}/files`
}
