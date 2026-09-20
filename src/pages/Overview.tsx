import OrbitCanvas from "@/components/OrbitCanvas"
import Telemetry from "@/components/Telemetry"
import Gauges from "@/components/Gauges"

const phases = [
  {
    className: "done",
    name: "Launch",
    time: "T+00:00",
  },
  {
    className: "done",
    name: "Earth-Bound",
    time: "T+00:11h",
  },
  {
    className: "now",
    name: "Trans-Lunar",
    time: "T+14:03h",
  },
  {
    className: "",
    name: "Lunar Orbit",
    time: "T+05d",
  },
  {
    className: "",
    name: "Descent",
    time: "T+18d",
  },
  {
    className: "",
    name: "Surface Ops",
    time: "T+18d",
  },
]

const events = [
  [
    "14:02:55",
    "nom",
    "NOMINAL",
    "Course-correction burn TCM-3 finished - dv 12.4 m/s",
  ],
  [
    "13:58:31",
    "inf",
    "LINK",
    "Signal handoff from IDSN-32 to DSN-14 queued",
  ],
  [
    "13:47:10",
    "nom",
    "NOMINAL",
    "Star tracker STR-2 back online, orientation locked",
  ],
  [
    "13:40:02",
    "cau",
    "CAUTION",
    "Radiator B running 2.4 C warmer than expected",
  ],
  [
    "13:22:48",
    "nom",
    "NOMINAL",
    "Solar panels putting out 1.42 kW, battery at 86%",
  ],
  [
    "12:58:33",
    "inf",
    "LINK",
    "Ranging pass done, orbit estimate refreshed",
  ],
  [
    "12:31:07",
    "nom",
    "NOMINAL",
    "Reaction wheel RW-3 momentum unload went as planned",
  ],
]

export default function Overview() {
  return (
    <div className="page grid">
      <div className="col">
        <section className="panel">
          <div className="p-head">
            <span className="tag">
              Orbital Track
            </span>

            <span className="sub">
              GEO-CENTRIC - J2000
            </span>

            <span className="rt">
              <span className="dot"></span>
              Live - sim
            </span>
          </div>

          <OrbitCanvas />
        </section>

        <section className="panel">
          <div className="p-head">
            <span className="tag">
              Mission Timeline
            </span>

            <span className="sub">
              FLIGHT PLAN v7
            </span>

            <span
              className="rt"
              style={{
                color: "var(--amber)",
              }}
            >
              PHASE 3 / 6
            </span>
          </div>

          <div className="p-body">
            <div className="phases">
              {phases.map(
                (phase, index) => (
                  <div
                    key={index}
                    className={
                      "phase " +
                      phase.className
                    }
                  >
                    <div className="bar"></div>
                    <div className="mk"></div>

                    <div className="nm">
                      {phase.name}
                    </div>

                    <div className="tm">
                      {phase.time}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="p-head">
            <span className="tag">
              Subsystem Telemetry
            </span>

            <span className="sub">
              SAMPLE 1 Hz
            </span>

            <span className="rt">
              <span className="dot"></span>
              Streaming
            </span>
          </div>

          <Telemetry />
        </section>
      </div>

      <div className="col">
        <section className="panel">
          <div className="p-head">
            <span className="tag">
              Power &amp; Signal
            </span>

            <span className="sub">
              EPS - RF
            </span>
          </div>

          <div className="p-body">
            <Gauges />
          </div>
        </section>

        <section className="panel">
          <div className="p-head">
            <span className="tag">
              Ground Stations
            </span>

            <span className="sub">
              DSN / IDSN
            </span>

            <span className="rt">
              <span className="dot"></span>
              1 Locked
            </span>
          </div>

          <div className="stations">
            <div className="station lock">
              <div className="bars">
                <i style={{ height: 6 }}></i>
                <i style={{ height: 10 }}></i>
                <i style={{ height: 14 }}></i>
                <i style={{ height: 18 }}></i>
              </div>

              <div className="meta">
                <div className="nm">
                  IDSN-32 Byalalu
                </div>

                <div className="loc">
                  Karnataka, India
                </div>
              </div>

              <div className="stt">
                <div className="s">
                  Locked
                </div>

                <div className="d">
                  S / X band
                </div>
              </div>
            </div>

            <div className="station acq">
              <div className="bars">
                <i
                  className="on"
                  style={{ height: 6 }}
                ></i>

                <i
                  className="on"
                  style={{ height: 10 }}
                ></i>

                <i
                  style={{ height: 14 }}
                ></i>

                <i
                  style={{ height: 18 }}
                ></i>
              </div>

              <div className="meta">
                <div className="nm">
                  DSN-14 Goldstone
                </div>

                <div className="loc">
                  California, USA
                </div>
              </div>

              <div className="stt">
                <div className="s">
                  Acquiring
                </div>

                <div className="d">
                  AOS 00:04:12
                </div>
              </div>
            </div>

            <div className="station idle">
              <div className="bars">
                <i style={{ height: 6 }}></i>
                <i style={{ height: 10 }}></i>
                <i style={{ height: 14 }}></i>
                <i style={{ height: 18 }}></i>
              </div>

              <div className="meta">
                <div className="nm">
                  DSN-43 Canberra
                </div>

                <div className="loc">
                  ACT, Australia
                </div>
              </div>

              <div className="stt">
                <div className="s">
                  Standby
                </div>

                <div className="d">
                  AOS 00:42:10
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="p-head">
            <span className="tag">
              Event Log
            </span>

            <span className="sub">
              GMT-LINKED
            </span>

            <span className="rt">
              128 entries
            </span>
          </div>

          <div className="log">
            {events.map(
              (event, index) => (
                <div
                  key={index}
                  className="ev"
                >
                  <span className="t">
                    T+{event[0]}
                  </span>

                  <span>
                    <span
                      className={
                        "sev " + event[1]
                      }
                    >
                      {event[2]}
                    </span>

                    <span className="x">
                      {event[3]}
                    </span>
                  </span>
                </div>
              )
            )}
          </div>
        </section>

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            gap: 10,
            padding: "2px 4px",
          }}
        >
          <span className="demoflag">
            Demo telemetry - representative values
          </span>

          <span className="demoflag">
            Console v1
          </span>
        </div>
      </div>
    </div>
  )
}
