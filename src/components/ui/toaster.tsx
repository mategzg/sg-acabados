"use client"

import * as React from 'react'

import { ToastAction, ToastDescription, ToastProvider, ToastTitle, ToastViewport, Toast } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

export type ToastProps = React.ComponentProps<typeof Toast> & {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}
export type ToastActionElement = React.ReactElement<typeof ToastAction>

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...toastProps }) => (
        <Toast key={id} {...toastProps}>
          {title ? <ToastTitle>{title}</ToastTitle> : null}
          {description ? <ToastDescription>{description}</ToastDescription> : null}
          {action}
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
