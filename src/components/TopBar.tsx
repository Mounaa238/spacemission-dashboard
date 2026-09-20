import { useEffect, useState } from "react"

function addZero(number: number) {
  if (number < 10) {
    return "0" + number
  }

  return String(number)
}

export default function TopBar() {
  const [seconds, setSeconds] = useState(
    14 * 3600 + 3 * 60 + 12
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((oldSeconds) => oldSeconds + 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  let left = seconds

  const days = Math.floor(left / 86400)
  left = left - days * 86400

  const hours = Math.floor(left / 3600)
  left = left - hours * 3600

  const minutes = Math.floor(left / 60)
  left = left - minutes * 60

  const missionTime =
    "T+" +
    addZero(days) +
    ":" +
    addZero(hours) +
    ":" +
    addZero(minutes) +
    ":" +
    addZero(left)

  return (
    <header className="topbar">
      <div className="mission-id">
        <span className="ey">
          Active Mission - LVM3-M4
        </span>

        <span className="nm">
          CHANDRAYAAN-3 <b>// DEEP SPACE NET</b>
        </span>
      </div>

      <div className="met">
        <span className="lbl">Mission Elapsed</span>
        <span className="val">{missionTime}</span>
      </div>

      <div className="tb-spacer"></div>

      <div className="pills">
        <span className="pill">
          <span className="dot"></span>
          Uplink <b>LOCK</b>
        </span>

        <span className="pill">
          <span className="dot"></span>
          Downlink <b>32.0 kb/s</b>
        </span>

        <span className="pill warn">
          <span className="dot"></span>
          Thermal <b>CAUTION</b>
        </span>
      </div>

      <div className="alarm">
        <span>&#9679;</span>
        ALL SYSTEMS NOMINAL
      </div>
    </header>
  )
}
