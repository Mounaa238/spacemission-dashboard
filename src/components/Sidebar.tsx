import { NavLink } from "react-router-dom"
import { Rocket, Satellite, Globe, Telescope } from "lucide-react"

const nav = [
  { to: "/", label: "Missions", icon: Rocket },
  { to: "/satellites", label: "Satellites", icon: Satellite },
  { to: "/earth", label: "Earth Observation", icon: Globe },
  { to: "/astronomy", label: "Astronomy", icon: Telescope },
]

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 border-r border-white/10 bg-white/5 p-4 backdrop-blur-xl">
      <div className="mb-8 flex items-center gap-2 px-2">
        <Rocket className="h-5 w-5 text-cyan-300" />

        <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
          SpaceDash
        </span>
      </div>

      <nav className="flex flex-col gap-1">
        {nav.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition " +
                (isActive
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white")
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
