import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Rocket,
  Satellite,
  Globe,
  Telescope,
  Radio,
  Settings,
} from "lucide-react"

const items = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/missions", label: "Missions", icon: Rocket },
  { to: "/satellites", label: "Satellites", icon: Satellite },
  { to: "/earth", label: "Earth Observation", icon: Globe },
  { to: "/astronomy", label: "Astronomy", icon: Telescope },
]

export default function Rail() {
  return (
    <nav className="rail" aria-label="Sections">
      <div className="logo" title="SpaceDash">
        <Rocket size={20} />
      </div>

      {items.map((item) => {
        const Icon = item.icon
        const linkClass = ({ isActive }: { isActive: boolean }) => {
          return "nav" + (isActive ? " on" : "")
        }

        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            title={item.label}
            aria-label={item.label}
            className={linkClass}
          >
            <Icon />
          </NavLink>
        )
      })}

      <div className="spacer"></div>

      <NavLink
        to="/"
        className="nav"
        title="Comms"
        aria-label="Comms"
      >
        <Radio />
      </NavLink>

      <NavLink
        to="/"
        className="nav"
        title="Settings"
        aria-label="Settings"
      >
        <Settings />
      </NavLink>
    </nav>
  )
}
