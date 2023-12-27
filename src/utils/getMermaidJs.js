import { copyFile } from 'fs'
import { join } from 'path'
import path from 'node:path'
import url from 'node:url'

const DIR_NAME = path.dirname(url.fileURLToPath(import.meta.url))

copyFile(
  join(DIR_NAME, '../../node_modules/mermaid/dist/mermaid.min.js'),
  join(DIR_NAME, '../mermaid.min.js'),
  (err) => {
    if (err) throw err
    console.log('source was copied to destination')
  },
)
