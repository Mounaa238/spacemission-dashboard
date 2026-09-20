import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface Props {
  label: string
  value: string | number
  icon: LucideIcon
}

export default function StatCard({
  label,
  value,
  icon: Icon,
}: Props) {
  return (
    <Card className="flex flex-row items-center gap-4 border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="rounded-xl bg-white/10 p-3">
        <Icon className="h-5 w-5 text-cyan-300" />
      </div>

      <div>
        <div className="text-2xl font-bold">
          {value}
        </div>

        <div className="text-xs text-slate-400">
          {label}
        </div>
      </div>
    </Card>
  )
}
