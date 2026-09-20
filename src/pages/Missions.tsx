import { useMemo, useState } from "react"
import { missions } from "@/data/missions"
import type { Agency } from "@/types"

const agencies: (Agency | "All")[] = [
  "All",
  "ISRO",
  "NASA",
]

export default function Missions() {
  const [agency, setAgency] =
    useState<Agency | "All">("All")

  const list = useMemo(() => {
    return missions.filter((mission) => {
      if (agency === "All") {
        return true
      }

      return mission.agency === agency
    })
  }, [agency])

  return (
    <div className="page">
      <div className="phead">
        <h1>
          MISSION <b>REGISTRY</b>
        </h1>

        <p>
          {list.length} programmes on record - flights from ISRO and NASA
        </p>
      </div>

      <div className="filters">
        {agencies.map((item) => {
          const selected =
            agency === item

          return (
            <button
              key={item}
              className={
                selected ? "on" : ""
              }
              onClick={() =>
                setAgency(item)
              }
            >
              {item}
            </button>
          )
        })}
      </div>

      <section className="panel">
        <div className="mrow head">
          <span>Mission</span>

          <span className="md-hide">
            Agency
          </span>

          <span className="col-mono">
            Year
          </span>

          <span className="md-hide">
            Class
          </span>

          <span
            style={{
              justifySelf: "end",
            }}
          >
            Status
          </span>
        </div>

        {list.map((mission) => (
          <div
            className="mrow"
            key={mission.id}
          >
            <div>
              <div className="mn">
                {mission.name}
              </div>

              <div className="md">
                {mission.description}
              </div>
            </div>

            <div className="md md-hide">
              {mission.agency}
            </div>

            <div className="col-mono">
              {mission.year}
            </div>

            <div className="md md-hide">
              {mission.category}
            </div>

            <div
              className={
                "mstat " +
                mission.status.toLowerCase()
              }
            >
              <span className="d"></span>
              {mission.status}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
