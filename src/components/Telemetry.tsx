import { useEffect, useRef } from "react"

interface Metric {
  key: string
  name: string
  unit: string
  value: number
  min: number
  max: number
  decimalPlaces: number
  color: string
  status: string
}

export default function Telemetry() {
  const telemetryRef =
    useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container =
      telemetryRef.current

    if (!container) {
      return
    }

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

    const metrics: Metric[] = [
      {
        key: "alt",
        name: "Altitude",
        unit: "km",
        value: 38420,
        min: 37000,
        max: 41000,
        decimalPlaces: 0,
        color: "var(--cyan)",
        status: "NOMINAL",
      },
      {
        key: "vel",
        name: "Velocity",
        unit: "km/s",
        value: 2.394,
        min: 2.1,
        max: 2.7,
        decimalPlaces: 3,
        color: "var(--amber)",
        status: "NOMINAL",
      },
      {
        key: "bus",
        name: "Bus Voltage",
        unit: "V",
        value: 28.1,
        min: 27.2,
        max: 29,
        decimalPlaces: 1,
        color: "var(--green)",
        status: "NOMINAL",
      },
      {
        key: "tmp",
        name: "Radiator B",
        unit: "°C",
        value: 2.4,
        min: -4,
        max: 6,
        decimalPlaces: 1,
        color: "var(--caution)",
        status: "CAUTION",
      },
    ]

    const historySize = 40

    const history: Record<
      string,
      number[]
    > = {}

    for (const metric of metrics) {
      history[metric.key] =
        Array.from(
          {
            length: historySize,
          },
          () =>
            metric.value +
            (Math.random() - 0.5) *
              (metric.max - metric.min) *
              0.12
        )
    }

    container.innerHTML = metrics
      .map((metric) => {
        const caution =
          metric.status === "CAUTION"
            ? " caution"
            : ""

        return (
          '<div class="metric">' +
          '<div class="top">' +
          '<span class="name">' +
          metric.name +
          "</span>" +
          '<span class="st' +
          caution +
          '">' +
          metric.status +
          "</span>" +
          "</div>" +
          '<div class="read" id="rd-' +
          metric.key +
          '">-</div>' +
          '<svg class="spark" viewBox="0 0 120 34" preserveAspectRatio="none">' +
          '<path id="spf-' +
          metric.key +
          '" fill="' +
          metric.color +
          '" opacity="0.1"></path>' +
          '<polyline id="spl-' +
          metric.key +
          '" fill="none" stroke="' +
          metric.color +
          '" stroke-width="1.5" vector-effect="non-scaling-stroke"></polyline>' +
          '<circle id="spc-' +
          metric.key +
          '" r="2" fill="' +
          metric.color +
          '"></circle>' +
          "</svg>" +
          "</div>"
        )
      })
      .join("")

    function draw(metric: Metric) {
      const width = 120
      const height = 34
      const padding = 3
      const values = history[metric.key]

      let low = Math.min(...values)
      let high = Math.max(...values)

      if (high - low < 0.000001) {
        high = low + 1
      }

      const count = values.length

      const points = values.map(
        (value, index) => {
          const x =
            padding +
            (index *
              (width - padding * 2)) /
              (count - 1)

          const y =
            height -
            padding -
            ((value - low) /
              (high - low)) *
              (height - padding * 2)

          return [x, y]
        }
      )

      const line = points
        .map(
          (point) =>
            point[0].toFixed(1) +
            "," +
            point[1].toFixed(1)
        )
        .join(" ")

      const lineElement =
        container.querySelector(
          "#spl-" + metric.key
        )

      if (lineElement) {
        lineElement.setAttribute(
          "points",
          line
        )
      }

      const area =
        "M0," +
        height +
        "L" +
        points
          .map(
            (point) =>
              point[0].toFixed(1) +
              "," +
              point[1].toFixed(1)
          )
          .join("L") +
        "L" +
        width +
        "," +
        height +
        "Z"

      const fillElement =
        container.querySelector(
          "#spf-" + metric.key
        )

      if (fillElement) {
        fillElement.setAttribute(
          "d",
          area
        )
      }

      const lastPoint =
        points[points.length - 1]

      const circle =
        container.querySelector(
          "#spc-" + metric.key
        )

      if (circle) {
        circle.setAttribute(
          "cx",
          lastPoint[0].toFixed(1)
        )

        circle.setAttribute(
          "cy",
          lastPoint[1].toFixed(1)
        )
      }

      const valueElement =
        container.querySelector(
          "#rd-" + metric.key
        )

      if (valueElement) {
        const formatted =
          metric.value
            .toFixed(
              metric.decimalPlaces
            )
            .replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            )

        valueElement.innerHTML =
          formatted +
          " <u>" +
          metric.unit +
          "</u>"
      }
    }

    metrics.forEach(draw)

    function updateValues() {
      for (const metric of metrics) {
        const middle =
          (metric.min + metric.max) / 2

        metric.value +=
          (Math.random() - 0.5) *
            ((metric.max - metric.min) *
              0.02) +
          (middle - metric.value) * 0.02

        if (metric.value < metric.min) {
          metric.value = metric.min
        }

        if (metric.value > metric.max) {
          metric.value = metric.max
        }

        history[metric.key].push(
          metric.value
        )

        if (
          history[metric.key].length >
          historySize
        ) {
          history[metric.key].shift()
        }

        draw(metric)
      }
    }

    let timer = 0

    if (!reduceMotion) {
      timer = window.setInterval(
        updateValues,
        900
      )
    }

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div
      className="telem"
      ref={telemetryRef}
    ></div>
  )
}
