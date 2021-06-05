import assert from 'assert'
import { Canvas, NodeCanvasRenderingContext2D } from 'canvas'

export interface CanvasAndContext {
  canvas: Canvas
  context: NodeCanvasRenderingContext2D
}

class NodeCanvasFactory {
  create(width: number, height: number): CanvasAndContext {
    assert(width > 0 && height > 0, 'Invalid canvas size')
    const canvas = new Canvas(width, height)
    const context = canvas.getContext('2d')
    return { canvas, context }
  }

  reset(canvasAndContext: CanvasAndContext, width: number, height: number) {
    assert(canvasAndContext.canvas, 'Canvas is not specified')
    assert(width > 0 && height > 0, 'Invalid canvas size')
    canvasAndContext.canvas.width = width
    canvasAndContext.canvas.height = height
  }

  destroy(canvasAndContext: CanvasAndContext) {
    assert(canvasAndContext.canvas, 'Canvas is not specified')

    // Zeroing the width and height cause Firefox to release graphics
    // resources immediately, which can greatly reduce memory consumption.
    canvasAndContext.canvas.width = 0
    canvasAndContext.canvas.height = 0
    // @ts-ignore
    canvasAndContext.canvas = null
    // @ts-ignore
    canvasAndContext.context = null
  }
}

export default NodeCanvasFactory
