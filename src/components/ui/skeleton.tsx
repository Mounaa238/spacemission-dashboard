import type { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {}

export function Skeleton({
  className = "",
  ...props
}: Props) {
  return (
    <div
      className={"animate-pulse rounded-md " + className}
      {...props}
    />
  )
}
