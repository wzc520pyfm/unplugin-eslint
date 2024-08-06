import { relative, resolve, sep } from 'node:path'
import process from 'node:process'

import { createFilter } from '@rollup/pluginutils'
import { ESLint } from 'eslint'
import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'

function normalizePath(id: string) {
  return relative(process.cwd(), id).split(sep).join('/')
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options = {}) => {
  if (typeof options === 'string') {
    const configFile = resolve(process.cwd(), options)

    // eslint-disable-next-line ts/no-require-imports
    options = require(configFile)
    // Tell eslint not to look for configuration files.

    options!.useEslintrc = false
  }

  const {
    include,
    exclude = /node_modules/,
    throwOnWarning = false,
    throwOnError = false,
    formatter = 'stylish',
    ...eslintOptions
  } = options!

  const eslintInstance = new ESLint(eslintOptions)
  const filter = createFilter(include, exclude)

  return {
    name: 'unplugin-eslint',
    async transform(_, id: string) {
      const file = normalizePath(id)
      if (!filter(id) || (await eslintInstance.isPathIgnored(file)))
        return null

      const results = await eslintInstance.lintFiles(file)
      const [result] = results

      if (eslintOptions.fix)
        await ESLint.outputFixes(results)

      if (result.warningCount === 0 && result.errorCount === 0)
        return null

      const eslintFormatter: ESLint.Formatter
        = typeof formatter === 'string'
          ? await eslintInstance.loadFormatter(formatter)
          : { format: formatter }
      const output = await eslintFormatter.format(results)

      if (output) {
        // eslint-disable-next-line no-console
        console.log(output)
      }

      const errorMessages = []
      if (result.warningCount > 0 && throwOnWarning)
        errorMessages.push(`${result.warningCount} warning${result.warningCount > 1 ? 's' : ''}`)

      if (result.errorCount > 0 && throwOnError)
        errorMessages.push(`${result.errorCount} error${result.errorCount > 1 ? 's' : ''}`)

      if (errorMessages.length > 0) {
        throw new Error(
          `Found ${errorMessages.join(' and ')} in ${relative('.', result.filePath)}`,
        )
      }

      return null
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
