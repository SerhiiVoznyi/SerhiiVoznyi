// Usage: node scripts/art-to-webp.mjs <input> <output.webp> [<input> <output.webp> ...]
// Resizes to at most 1280px wide and lowers quality until the file fits the art budget.
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const MAX_WIDTH = 1280
const MAX_BYTES = 200 * 1024
const QUALITIES = [82, 76, 70, 64, 58, 52, 46, 40]

const convert = async (input, output) => {
  let buffer
  for (const quality of QUALITIES) {
    buffer = await sharp(input)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toBuffer()
    if (buffer.length <= MAX_BYTES) break
  }
  await mkdir(path.dirname(output), { recursive: true })
  await writeFile(output, buffer)
  const flag = buffer.length > MAX_BYTES ? '  (over budget)' : ''
  console.info(`${Math.round(buffer.length / 1024)} KB  ${output}${flag}`)
}

const args = process.argv.slice(2)
if (args.length === 0 || args.length % 2 !== 0) {
  console.error('Usage: node scripts/art-to-webp.mjs <input> <output.webp> [...]')
  process.exit(1)
}
for (let index = 0; index < args.length; index += 2) {
  await convert(args[index], args[index + 1])
}
