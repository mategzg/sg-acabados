﻿"use client"

import * as React from 'react'
import { ToastProvider } from '@/components/ui/toast'
import type { ToastProps } from '@/components/ui/toaster'

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST'
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({ type: 'REMOVE_TOAST', toastId })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export type Toast = ToastProps & {
  id: string
}

type State = {
  toasts: Toast[]
}

type Action =
  | {
      type: typeof actionTypes.ADD_TOAST
      toast: Toast
    }
  | {
      type: typeof actionTypes.UPDATE_TOAST
      toast: Partial<Toast>
    }
  | {
      type: typeof actionTypes.DISMISS_TOAST
      toastId?: string
    }
  | {
      type: typeof actionTypes.REMOVE_TOAST
      toastId?: string
    }

const toastTimeout = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST: {
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      }
    }

    case actionTypes.UPDATE_TOAST: {
      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === action.toast.id ? { ...toast, ...action.toast } : toast
        )
      }
    }

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action

      if (toastId) addToRemoveQueue(toastId)
      else state.toasts.forEach((toast) => addToRemoveQueue(toast.id))

      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === toastId || toastId === undefined
            ? {
                ...toast,
                open: false
              }
            : toast
        )
      }
    }
    case actionTypes.REMOVE_TOAST: {
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: []
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.toastId)
      }
    }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = toastTimeout(memoryState, action)
  listeners.forEach((listener) => listener(memoryState))
}

export function toast({ ...props }: ToastProps) {
  const id = genId()

  const update = (props: Toast) => dispatch({ type: 'UPDATE_TOAST', toast: { ...props, id } })
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id })

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id
    }
  })

  return {
    id,
    dismiss,
    update
  }
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId })
  }
}

export { ToastProvider }
