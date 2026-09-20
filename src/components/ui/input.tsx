import type { InputHTMLAttributes } from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({
  className = "",
  ...props
}: Props) {
  return (
    <input
      className={
        "flex h-10 w-full rounded-md border px-3 py-2 text-sm " +
        "bg-transparent outline-none placeholder:text-slate-500 " +
        "focus:ring-2 focus:ring-cyan-400/40 " +
        className
      }
      {...props}
    />
  )
}
