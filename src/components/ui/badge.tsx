import type { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline"
}

export function Badge({
  variant = "default",
  className = "",
  ...props
}: Props) {
  let styles =
    "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium"

  if (variant === "outline") {
    styles += " border"
  }

  return (
    <div
      className={styles + " " + className}
      {...props}
    />
  )
}
