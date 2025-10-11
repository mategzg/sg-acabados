/* eslint-disable @typescript-eslint/no-namespace */
import type { DetailedHTMLProps, HTMLAttributes } from "react"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "zapier-interfaces-chatbot-embed": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}

export {}

