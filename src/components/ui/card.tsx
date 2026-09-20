import type { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {}

export function Card({
  className = "",
  ...props
}: Props) {
  return (
    <div
      className={"rounded-xl " + className}
      {...props}
    />
  )
}
