import { readFileSync, writeFileSync } from 'fs'
import { parse } from 'path'
import type { getDocument } from 'pdfjs-dist'

import NodeCanvasFactory from './NodeCanvasFactory'

export default async function pdfThumbGenerate(
  pathPdf: string,
  outputPath?: string
): Promise<string> {
  try {
    const pdfGetDocument: typeof getDocument = require('pdfjs-dist/es5/build/pdf').getDocument

    // Read the PDF file into a typed array so PDF.js can load it.
    const rawData = new Uint8Array(readFileSync(pathPdf))
    const outputFile = outputPath || `${parse(pathPdf).name}.png`

    const pdfDocument = await pdfGetDocument(rawData).promise
    if (pdfDocument) {
      // PDF loaded
      const page = await pdfDocument.getPage(1)
      const viewport = page.getViewport({ scale: 1.0 })
      const canvasFactory = new NodeCanvasFactory()
      const canvasAndContext = canvasFactory.create(viewport.width, viewport.height)
      const renderContext = {
        canvasContext: canvasAndContext.context,
        viewport: viewport,
        canvasFactory: canvasFactory
      }

      await page.render(renderContext).promise
      const image = canvasAndContext.canvas.toBuffer()
      writeFileSync(outputFile, image)
      return outputFile
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
