import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Mission } from "@/types"

const statusColor: Record<string, string> = {
  Active: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Completed: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  Planned: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Failed: "bg-rose-500/20 text-rose-300 border-rose-500/30",
}

export default function MissionCard({
  mission,
}: {
  mission: Mission
}) {
  const badgeColor = statusColor[mission.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group h-full overflow-hidden border-white/10 bg-white/5 backdrop-blur transition hover:border-cyan-400/40 hover:bg-white/10">
        <div className="h-24 bg-gradient-to-br from-indigo-600/40 via-slate-800 to-cyan-600/30"></div>

        <div className="p-5">
          <div className="mb-2 flex items-center justify-between">
            <Badge
              variant="outline"
              className="border-white/20 text-slate-300"
            >
              {mission.agency}
            </Badge>

            <Badge
              variant="outline"
              className={badgeColor}
            >
              {mission.status}
            </Badge>
          </div>

          <h3 className="text-lg font-semibold">
            {mission.name}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {mission.category} - {mission.year}
          </p>

          <p className="mt-3 text-sm text-slate-400">
            {mission.description}
          </p>
        </div>
      </Card>
    </motion.div>
  )
}
