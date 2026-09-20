import { useEffect, useRef } from "react"

function makeGauge(
  element: HTMLElement,
  label: string,
  value: number,
  color: string
) {
  const centerX = 60
  const centerY = 58
  const radius = 44

  const startAngle = 150
  const endAngle = 390

  function getPoint(angle: number) {
    const radians =
      (angle * Math.PI) / 180

    return [
      centerX +
        radius *
          Math.cos(radians),

      centerY +
        radius *
          Math.sin(radians),
    ]
  }

  function makeArc(
    firstAngle: number,
    lastAngle: number
  ) {
    const firstPoint =
      getPoint(firstAngle)

    const lastPoint =
      getPoint(lastAngle)

    const largeArc =
      lastAngle - firstAngle > 180
        ? 1
        : 0

    return (
      "M" +
      firstPoint[0].toFixed(1) +
      " " +
      firstPoint[1].toFixed(1) +
      " A" +
      radius +
      " " +
      radius +
      " 0 " +
      largeArc +
      " 1 " +
      lastPoint[0].toFixed(1) +
      " " +
      lastPoint[1].toFixed(1)
    )
  }

  const valueAngle =
    startAngle +
    ((endAngle - startAngle) *
      value) /
      100

  element.innerHTML =
    '<svg viewBox="0 0 120 78">' +
    '<path d="' +
    makeArc(
      startAngle,
      endAngle
    ) +
    '" fill="none" stroke="var(--raised)" stroke-width="7" stroke-linecap="round"/>' +
    '<path d="' +
    makeArc(
      startAngle,
      valueAngle
    ) +
    '" fill="none" stroke="' +
    color +
    '" stroke-width="7" stroke-linecap="round" style="filter:drop-shadow(0 0 4px ' +
    color +
    ')"/>' +
    '<text class="gv" x="60" y="60" text-anchor="middle">' +
    Math.round(value) +
    '<tspan font-size="10" fill="var(--dim)">%</tspan></text>' +
    "</svg>" +
    '<div class="glab">' +
    label +
    "</div>"
}

export default function Gauges() {
  const powerRef =
    useRef<HTMLDivElement>(null)

  const signalRef =
    useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

    let power = 86
    let signal = 72

    function update() {
      power +=
        (Math.random() - 0.5) * 2

      power = Math.max(
        70,
        Math.min(98, power)
      )

      signal +=
        (Math.random() - 0.5) * 3

      signal = Math.max(
        55,
        Math.min(88, signal)
      )

      if (powerRef.current) {
        makeGauge(
          powerRef.current,
          "Solar Array",
          power,
          "var(--green)"
        )
      }

      if (signalRef.current) {
        makeGauge(
          signalRef.current,
          "Signal / SNR",
          signal,
          "var(--cyan)"
        )
      }
    }

    update()

    let timer = 0

    if (!reduceMotion) {
      timer = window.setInterval(
        update,
        1600
      )
    }

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="gauges">
      <div
        className="gauge"
        ref={powerRef}
      ></div>

      <div
        className="gauge"
        ref={signalRef}
      ></div>
    </div>
  )
}
