#!/usr/bin/env node
/**
 * Normalise Spanish accents/capitalisation in visible copy while respecting code identifiers.
 * - For TS/TSX files we only touch string literals (including JSX text) via ts-morph.
 * - For Markdown / MDX / JSON we run guarded regex replacements.
 * - URLs, slugs and known identifiers remain untouched by contextual guards.
 *
 * Usage:
 *   npm run fix:accents          # apply changes
 *   npm run fix:accents -- --dry-run   # preview without writing
 */

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Project, SyntaxKind } from 'ts-morph'

const ROOT = process.cwd()
const TARGET_DIRS = ['src', 'app', 'content']
const TS_EXTENSIONS = new Set(['.ts', '.tsx'])
const TEXT_EXTENSIONS = new Set(['.md', '.mdx', '.json'])
const ALLOWED_EXTENSIONS = new Set([...TS_EXTENSIONS, ...TEXT_EXTENSIONS])
const IGNORED_DIRS = new Set(['node_modules', '.git', '.next', '.vercel', 'dist', 'build', 'out', 'public'])

const isDryRun = process.argv.includes('--dry-run')

type WordReplacement = {
  word: string
  replacement: string
}

const WORD_REPLACEMENTS: WordReplacement[] = [
  { word: 'cotizacion', replacement: 'cotización' },
  { word: 'iluminacion', replacement: 'iluminación' },
  { word: 'tecnico', replacement: 'técnico' },
  { word: 'tecnica', replacement: 'técnica' },
  { word: 'tecnicos', replacement: 'técnicos' },
  { word: 'tecnicas', replacement: 'técnicas' },
  { word: 'acustico', replacement: 'acústico' },
  { word: 'acustica', replacement: 'acústica' },
  { word: 'acusticos', replacement: 'acústicos' },
  { word: 'acusticas', replacement: 'acústicas' },
  { word: 'termico', replacement: 'térmico' },
  { word: 'termica', replacement: 'térmica' },
  { word: 'termicos', replacement: 'térmicos' },
  { word: 'termicas', replacement: 'térmicas' },
  { word: 'logistica', replacement: 'logística' },
  { word: 'presion', replacement: 'presión' },
  { word: 'instalacion', replacement: 'instalación' },
  { word: 'ubicacion', replacement: 'ubicación' },
  { word: 'area', replacement: 'área' },
  { word: 'areas', replacement: 'áreas' },
  { word: 'pagina', replacement: 'página' },
  { word: 'atencion', replacement: 'atención' },
  { word: 'informacion', replacement: 'información' },
  { word: 'comunicacion', replacement: 'comunicación' },
  { word: 'coordinacion', replacement: 'coordinación' },
  { word: 'ejecucion', replacement: 'ejecución' },
  { word: 'solucion', replacement: 'solución' },
  { word: 'educacion', replacement: 'educación' },
  { word: 'peru', replacement: 'perú' },
  { word: 'tandem', replacement: 'tándem' },
  { word: 'clinica', replacement: 'clínica' },
  { word: 'clinicas', replacement: 'clínicas' },
  { word: 'whatsapp', replacement: 'WhatsApp' }
]

const AFTER_URL_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.pdf', '.svg']

function matchCase(source: string, target: string) {
  if (source === source.toUpperCase()) return target.toUpperCase()
  if (source[0] === source[0].toUpperCase()) return target[0].toUpperCase() + target.slice(1)
  return target
}

function shouldSkip(text: string, start: number, end: number): boolean {
  const prev = text[start - 1] ?? ''
  const next = text[end] ?? ''
  if (prev === '.' || prev === '_' || prev === '-' || prev === '/' || next === '-' || next === '/' || next === '_') {
    return true
  }

  const before = text.slice(Math.max(0, start - 12), start).toLowerCase()
  if (before.includes('http') || before.includes('://') || before.includes('href=') || before.includes('src=')) {
    return true
  }

  const after = text.slice(end, end + 12).toLowerCase()
  if (AFTER_URL_EXTENSIONS.some((ext) => after.startsWith(ext))) {
    return true
  }

  if (text[start - 1] === '"') {
    const remainder = text.slice(end).trimStart()
    if (remainder.startsWith('":')) {
      return true
    }
  }

  return false
}

function replaceWordWithGuards(text: string, word: string, replacement: string) {
  const letters = 'A-Za-zÁÉÍÓÚáéíóúÑñ0-9'
  const regex = new RegExp(`(^|[^${letters}_/.-])(${word})(?=[^${letters}_-])`, 'gi')
  return text.replace(regex, (matched, prefix: string, captured: string, offset: number, str: string) => {
    const start = offset + prefix.length
    const end = start + captured.length
    if (shouldSkip(str, start, end)) {
      return matched
    }
    return prefix + matchCase(captured, replacement)
  })
}

function applyWordReplacements(text: string) {
  let updated = text
  for (const { word, replacement } of WORD_REPLACEMENTS) {
    updated = replaceWordWithGuards(updated, word, replacement)
  }
  return updated
}

const M2_REGEX = /(\d[\d\s.,]*)\s?m2/gi

function replaceM2(text: string) {
  return text.replace(M2_REGEX, (matched, numberPart: string, offset: number, str: string) => {
    const start = offset
    const end = offset + matched.length
    if (shouldSkip(str, start, end)) {
      return matched
    }
    const normalizedNumber = numberPart.trimEnd()
    return `${normalizedNumber} m`
  })
}

function transformText(text: string) {
  const afterWords = applyWordReplacements(text)
  return replaceM2(afterWords)
}

async function walkDir(dir: string) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) continue
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...await walkDir(fullPath))
    } else if (ALLOWED_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath)
    }
  }

  return files
}

const project = new Project({
  tsConfigFilePath: path.join(ROOT, 'tsconfig.json'),
  skipAddingFilesFromTsConfig: true
})

async function processTsFile(filePath: string) {
  let sourceFile
  try {
    sourceFile = project.addSourceFileAtPath(filePath)
  } catch {
    const content = await fs.readFile(filePath, 'utf8')
    sourceFile = project.createSourceFile(filePath, content, { overwrite: true })
  }

  let changed = false

  const stringLiterals = sourceFile.getDescendantsOfKind(SyntaxKind.StringLiteral)
  const noSubTemplates = sourceFile.getDescendantsOfKind(SyntaxKind.NoSubstitutionTemplateLiteral)

  for (const literal of [...stringLiterals, ...noSubTemplates]) {
    const original = literal.getLiteralText()
    const transformed = transformText(original)
    if (transformed !== original) {
      changed = true
      if (!isDryRun) {
        literal.setLiteralValue(transformed)
      }
    }
  }

  const jsxTexts = sourceFile.getDescendantsOfKind(SyntaxKind.JsxText)
  for (const jsxText of jsxTexts) {
    const original = jsxText.getText()
    const transformed = transformText(original)
    if (transformed !== original) {
      changed = true
      if (!isDryRun) {
        jsxText.replaceWithText(transformed)
      }
    }
  }

  if (changed) {
    if (isDryRun) {
      console.log(`[dry-run] ${filePath}`)
    } else {
      await sourceFile.save()
      console.log(`updated ${filePath}`)
    }
  }

  sourceFile.forget()
}

async function processTextFile(filePath: string) {
  const original = await fs.readFile(filePath, 'utf8')
  const transformed = transformText(original)
  if (transformed !== original) {
    if (isDryRun) {
      console.log(`[dry-run] ${filePath}`)
    } else {
      await fs.writeFile(filePath, transformed, 'utf8')
      console.log(`updated ${filePath}`)
    }
  }
}

async function main() {
  for (const dir of TARGET_DIRS) {
    const target = path.join(ROOT, dir)
    try {
      await fs.access(target)
    } catch {
      continue
    }

    const files = await walkDir(target)
    for (const filePath of files) {
      const ext = path.extname(filePath)
      if (TS_EXTENSIONS.has(ext)) {
        await processTsFile(filePath)
      } else if (TEXT_EXTENSIONS.has(ext)) {
        await processTextFile(filePath)
      }
    }
  }
}

const modulePath = fileURLToPath(import.meta.url)
if (path.resolve(process.argv[1] ?? '') === modulePath) {
  main().catch((error) => {
    console.error('[fix-accents] Unexpected error:', error)
    process.exitCode = 1
  })
}

export { transformText }
