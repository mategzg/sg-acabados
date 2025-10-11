"use client"

import Script from "next/script"
import { useEffect, useState } from "react"

const SCRIPT_ID = "zapier-interfaces-embed-script"

export function ZapierNative() {
  const chatbotId = (process.env.NEXT_PUBLIC_ZAPIER_CHATBOT_ID || "").trim()
  const embedSrc = (process.env.NEXT_PUBLIC_ZAPIER_EMBED_SRC || "").trim()

  const shouldRender = chatbotId !== "" && embedSrc !== ""

  const [hasScript, setHasScript] = useState(() => {
    if (!shouldRender) {
      return false
    }
    if (typeof window === "undefined") {
      return false
    }
    return Boolean(document.querySelector(`script[src="${embedSrc}"]`))
  })

  useEffect(() => {
    if (!shouldRender) {
      setHasScript(false)
      return
    }
    if (typeof window === "undefined") {
      return
    }
    const exists = Boolean(document.querySelector(`script[src="${embedSrc}"]`))
    setHasScript(exists)
  }, [shouldRender, embedSrc])

  if (!shouldRender) {
    return null
  }

  return (
    <>
      {!hasScript ? (
        <Script
          id={SCRIPT_ID}
          src={embedSrc}
          type="module"
          strategy="afterInteractive"
          async
          onLoad={() => {
            setHasScript(true)
          }}
        />
      ) : null}
      <zapier-interfaces-chatbot-embed
        is-popup="true"
        chatbot-id={chatbotId}
      ></zapier-interfaces-chatbot-embed>
    </>
  )
}