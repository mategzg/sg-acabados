#!/usr/bin/env node
/*
 * Utility script to normalize Spanish accents and capitalization across content files.
 * Usage:
 *   pnpm ts-node scripts/fix-accents.ts        # apply replacements in-place
 *   pnpm ts-node scripts/fix-accents.ts --dry-run   # preview changes without writing
 */

import { promises as fs } from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const TARGET_DIRS = ['src', 'app', 'content']
const ALLOWED_EXTENSIONS = new Set(['.ts', '.tsx', '.md', '.mdx', '.json'])
const IGNORED_DIR_NAMES = new Set(['node_modules', '.git', '.next', 'dist', 'public', '.vercel'])

const isDryRun = process.argv.includes('--dry-run')

type ReplacementRule = {
  description: string
  regex: RegExp
  replacer: (...args: any[]) => string
}

function applyCase(source: string, target: string) {
  if (source === source.toUpperCase()) {
    return target.toUpperCase()
  }
  if (source[0] === source[0].toUpperCase()) {
    return target[0].toUpperCase() + target.slice(1)
  }
  return target
}

function createWordRule(word: string, replacement: string, description: string): ReplacementRule {
  const regex = new RegExp(`(^|[^A-Za-z0-9_/.-])(${word})(?=[^A-Za-z0-9_-])`, 'gi')
  return {
    description,
    regex,
    replacer: (_match: string, prefix: string, captured: string) => `${prefix}${applyCase(captured, replacement)}`
  }
}

const RULES: ReplacementRule[] = [
  {
    description: 'Capitalizar WhatsApp en copy visible',
    regex: /(^|[^A-Za-z0-9_/.-])(whatsapp)(?=[^A-Za-z0-9_-])/gi,
    replacer: (_match: string, prefix: string, captured: string) => `${prefix}${applyCase(captured, 'WhatsApp')}`
  },
  createWordRule('clinica', 'clínica', 'Acentuar “clínica”'),
  createWordRule('clinicas', 'clínicas', 'Acentuar “clínicas”')
]

async function walk(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    if (IGNORED_DIR_NAMES.has(entry.name)) continue
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)))
    } else if (ALLOWED_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath)
    }
  }

  return files
}

async function processFile(filePath: string) {
  const original = await fs.readFile(filePath, 'utf8')
  let updated = original

  for (const rule of RULES) {
    const next = updated.replace(rule.regex, (...args) => rule.replacer(...args))
    if (next !== updated) {
      updated = next
    }
  }

  if (updated !== original) {
    if (isDryRun) {
      console.log(`[dry-run] ${filePath}`)
    } else {
      await fs.writeFile(filePath, updated, 'utf8')
      console.log(`updated ${filePath}`)
    }
  }
}

async function main() {
  for (const dir of TARGET_DIRS) {
    const absolute = path.join(ROOT, dir)
    const exists = await fs
      .access(absolute)
      .then(() => true)
      .catch(() => false)

    if (!exists) continue

    const files = await walk(absolute)
    for (const file of files) {
      await processFile(file)
    }
  }
}

main().catch((error) => {
  console.error('[fix-accents] Unexpected error:', error)
  process.exitCode = 1
})
