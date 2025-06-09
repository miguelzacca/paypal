import path from 'node:path'

export function abs(relativePath) {
  return path.resolve(process.cwd(), relativePath)
}
