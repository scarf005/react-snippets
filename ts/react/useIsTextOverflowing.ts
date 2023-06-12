import { useLayoutEffect, useRef, useState } from "react"

export const useIsTextOverflowing = () => {
  const ref = useRef<HTMLElement>(null)
  const [val, set] = useState(false)

  useLayoutEffect(() => {
    const { current: cur } = ref
    if (cur) {
      set(cur.scrollWidth > cur.clientWidth)
    }
  }, [])

  return { ref, isOverflowing: val }
}
