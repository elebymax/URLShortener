import yaml from 'js-yaml'
import { readFileSync } from 'fs'
import { join } from 'path'

export const openapi = yaml.safeLoad(readFileSync(join(__dirname, '../../openapi.yaml'), 'utf8'))
