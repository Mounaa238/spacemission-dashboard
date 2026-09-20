import { useState } from "react"
import SatelliteScene from "@/components/three/SatelliteScene"
import { satellites } from "@/data/satellites"

export default function Satellites() {
  const [activeId, setActiveId] =
    useState<string | null>(null)

  const activeSatellite =
    satellites.find(
      (satellite) =>
        satellite.id === activeId
    )

  return (
    <div className="page">
      <div className="phead">
        <h1>
          SATELLITE <b>TRACKING</b>
        </h1>

        <p>
          Real-time orbit view - pick a satellite from the scene or the list
        </p>
      </div>

      <div className="grid">
        <section
          className="panel col"
          style={{ gap: 0 }}
        >
          <div className="p-head">
            <span className="tag">
              Orbital Scene
            </span>

            <span className="sub">
              3D - drag to rotate
            </span>

            <span className="rt">
              <span className="dot"></span>
              Live
            </span>
          </div>

          <div
            className="stage"
            style={{
              height: 440,
            }}
          >
            <div
              style={{
                position:
                  "absolute",
                inset: 0,
              }}
            >
              <SatelliteScene
                activeId={activeId}
                onSelect={
                  setActiveId
                }
              />
            </div>

            {activeSatellite && (
              <div
                className="rd"
                style={{
                  position:
                    "absolute",
                  bottom: 12,
                  left: 12,
                  border:
                    "1px solid var(--line)",
                  borderRadius: 8,
                  padding:
                    "8px 11px",
                  background:
                    "rgba(6,10,20,.6)",
                }}
              >
                <div
                  style={{
                    fontFamily:
                      "var(--hud)",
                    fontWeight: 600,
                    color:
                      activeSatellite.color,
                  }}
                >
                  {
                    activeSatellite.name
                  }
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color:
                      "var(--dim)",
                  }}
                >
                  {
                    activeSatellite.purpose
                  }
                </div>

                <div
                  style={{
                    fontFamily:
                      "var(--mono)",
                    fontSize: 11,
                    color:
                      "var(--muted)",
                  }}
                >
                  ALT{" "}
                  {activeSatellite.altitudeKm.toLocaleString()} km
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="panel">
          <div className="p-head">
            <span className="tag">
              Roster
            </span>

            <span className="sub">
              {satellites.length} objects
            </span>
          </div>

          <div className="sat-list">
            {satellites.map(
              (satellite) => {
                const selected =
                  activeId ===
                  satellite.id

                return (
                  <button
                    key={
                      satellite.id
                    }
                    className={
                      "sat" +
                      (selected
                        ? " on"
                        : "")
                    }
                    onClick={() =>
                      setActiveId(
                        satellite.id
                      )
                    }
                  >
                    <span
                      className="swatch"
                      style={{
                        background:
                          satellite.color,
                      }}
                    ></span>

                    <div className="meta">
                      <div className="nm">
                        {
                          satellite.name
                        }
                      </div>

                      <div className="d">
                        {
                          satellite.type
                        }{" "}
                        -{" "}
                        {satellite.altitudeKm.toLocaleString()} km
                      </div>
                    </div>

                    <span className="ag">
                      {satellite.agency}
                    </span>
                  </button>
                )
              }
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
