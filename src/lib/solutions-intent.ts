import solutionsContent from '@/content/soluciones.json'
import type { SolutionsContent, SolutionsSegment } from '@/types/solutions'

const content = solutionsContent as SolutionsContent

export function getSolutionsContent(): SolutionsContent {
  return content
}

export function getSolutionsSegments(): SolutionsContent['segments'] {
  return content.segments
}

export function getSolutionsSegment(id: string): SolutionsSegment | undefined {
  return content.segments.find((segment) => segment.id === id)
}
