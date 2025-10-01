import fs from 'node:fs/promises'
import path from 'node:path'

import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'

export type MDXEntry<T> = T & {
  slug: string
  content: React.ReactNode
}

async function readDirSafe(dir: string) {
  try {
    return await fs.readdir(dir)
  } catch {
    return []
  }
}

export async function loadMdxList<T>(relativeDir: string) {
  const dir = path.join(process.cwd(), 'src', 'content', relativeDir)
  const files = await readDirSafe(dir)
  const entries: MDXEntry<T>[] = []

  for (const file of files.filter((name) => name.endsWith('.mdx'))) {
    const slug = file.replace(/\.mdx$/, '')
    const source = await fs.readFile(path.join(dir, file), 'utf8')
    const { content, data } = matter(source)
    const compiled = await compileMDX<{ [key: string]: unknown }>({
      source: content,
      components: {},
      options: {
        parseFrontmatter: false
      }
    })

    entries.push({ slug, ...(data as T), content: compiled.content })
  }

  return entries
}

export async function loadMdxEntry<T>(relativeDir: string, slug: string) {
  const filePath = path.join(process.cwd(), 'src', 'content', relativeDir, `${slug}.mdx`)
  const source = await fs.readFile(filePath, 'utf8')
  const { content, data } = matter(source)
  const compiled = await compileMDX<{ [key: string]: unknown }>({
    source: content,
    components: {},
    options: {
      parseFrontmatter: false
    }
  })

  return { slug, ...(data as T), content: compiled.content }
}

