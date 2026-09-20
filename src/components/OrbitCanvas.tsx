import { useEffect, useRef } from "react"

export default function OrbitCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const altitudeRef = useRef<HTMLSpanElement>(null)
  const velocityRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const ctx = canvas.getContext("2d")

    if (!ctx) {
      return
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    let width = 0
    let height = 0
    let animationId = 0
    let time = 0

    let stars: {
      x: number
      y: number
      r: number
      p: number
      s: number
    }[] = []

    const cityLights = Array.from(
      { length: 70 },
      () => ({
        lat: (Math.random() - 0.5) * 2.4,
        lon: Math.random() * 6.2832,
      })
    )

    function makeStars() {
      stars = []

      const count = Math.round(
        (width * height) / 5200
      )

      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.1 + 0.2,
          p: Math.random() * 6.28,
          s: 0.4 + Math.random() * 0.9,
        })
      }
    }

    function resizeCanvas() {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      )

      const rect = canvas.getBoundingClientRect()

      width = rect.width
      height = rect.height

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      makeStars()
    }

    function draw() {
      time += 0.006

      ctx.clearRect(
        0,
        0,
        width,
        height
      )

      // Draw the stars
      for (const star of stars) {
        ctx.globalAlpha =
          0.35 +
          0.4 *
            Math.sin(
              time * star.s * 3 + star.p
            )

        ctx.fillStyle = "#cfe0ff"

        ctx.beginPath()
        ctx.arc(
          star.x,
          star.y,
          star.r,
          0,
          6.2832
        )
        ctx.fill()
      }

      ctx.globalAlpha = 1

      const earthX = width * 0.34
      const earthY = height * 0.56
      const earthRadius =
        Math.min(width, height) * 0.2

      const orbitWidth = earthRadius * 2.05
      const orbitHeight = earthRadius * 0.7
      const orbitRotation = -0.32

      const cosRotation =
        Math.cos(orbitRotation)

      const sinRotation =
        Math.sin(orbitRotation)

      // Draw the orbit
      ctx.save()

      ctx.translate(earthX, earthY)
      ctx.rotate(orbitRotation)

      ctx.strokeStyle =
        "rgba(55,224,255,0.28)"
      ctx.lineWidth = 1
      ctx.setLineDash([4, 5])

      ctx.beginPath()

      ctx.ellipse(
        0,
        0,
        orbitWidth,
        orbitHeight,
        0,
        0,
        6.2832
      )

      ctx.stroke()

      ctx.setLineDash([])
      ctx.restore()

      // Earth glow
      const glow = ctx.createRadialGradient(
        earthX,
        earthY,
        earthRadius * 0.6,
        earthX,
        earthY,
        earthRadius * 1.7
      )

      glow.addColorStop(
        0,
        "rgba(55,140,255,0.2)"
      )

      glow.addColorStop(
        1,
        "rgba(55,140,255,0)"
      )

      ctx.fillStyle = glow

      ctx.beginPath()

      ctx.arc(
        earthX,
        earthY,
        earthRadius * 1.7,
        0,
        6.2832
      )

      ctx.fill()

      // Earth itself
      const earthGradient =
        ctx.createRadialGradient(
          earthX - earthRadius * 0.35,
          earthY - earthRadius * 0.35,
          earthRadius * 0.1,
          earthX,
          earthY,
          earthRadius
        )

      earthGradient.addColorStop(
        0,
        "#2b6fb0"
      )

      earthGradient.addColorStop(
        0.55,
        "#154b82"
      )

      earthGradient.addColorStop(
        1,
        "#0a2545"
      )

      ctx.fillStyle = earthGradient

      ctx.beginPath()

      ctx.arc(
        earthX,
        earthY,
        earthRadius,
        0,
        6.2832
      )

      ctx.fill()

      // Latitude and longitude lines
      ctx.save()

      ctx.beginPath()

      ctx.arc(
        earthX,
        earthY,
        earthRadius,
        0,
        6.2832
      )

      ctx.clip()

      const longitude = time * 0.5

      ctx.strokeStyle =
        "rgba(120,180,255,0.13)"

      ctx.lineWidth = 0.8

      for (let i = 0; i < 6; i++) {
        const xRadius = Math.abs(
          Math.cos(
            longitude +
              (i * Math.PI) / 6
          ) * earthRadius
        )

        ctx.beginPath()

        ctx.ellipse(
          earthX,
          earthY,
          xRadius,
          earthRadius,
          0,
          0,
          6.2832
        )

        ctx.stroke()
      }

      for (let i = -2; i <= 2; i++) {
        const factor = i * 0.32

        const radius =
          earthRadius *
          Math.sqrt(
            Math.max(
              0,
              1 - factor * factor
            )
          )

        ctx.beginPath()

        ctx.ellipse(
          earthX,
          earthY + factor * earthRadius,
          radius,
          radius * 0.24,
          0,
          0,
          6.2832
        )

        ctx.stroke()
      }

      // City lights
      for (const city of cityLights) {
        const longitude2 =
          city.lon + longitude

        const x =
          Math.cos(city.lat) *
          Math.sin(longitude2)

        const y =
          Math.sin(city.lat)

        const z =
          Math.cos(city.lat) *
          Math.cos(longitude2)

        if (z <= 0) {
          continue
        }

        const nightSide = x + 0.15

        if (nightSide <= 0) {
          continue
        }

        ctx.globalAlpha =
          Math.min(0.9, nightSide) * 0.8

        ctx.fillStyle = "#ffca66"

        ctx.beginPath()

        ctx.arc(
          earthX + x * earthRadius,
          earthY - y * earthRadius,
          0.8,
          0,
          6.2832
        )

        ctx.fill()
      }

      ctx.globalAlpha = 1

      const nightGradient =
        ctx.createLinearGradient(
          earthX - earthRadius,
          earthY,
          earthX + earthRadius,
          earthY
        )

      nightGradient.addColorStop(
        0,
        "rgba(2,5,12,0)"
      )

      nightGradient.addColorStop(
        0.55,
        "rgba(2,5,12,0.06)"
      )

      nightGradient.addColorStop(
        1,
        "rgba(2,5,12,0.7)"
      )

      ctx.fillStyle = nightGradient

      ctx.fillRect(
        earthX - earthRadius,
        earthY - earthRadius,
        earthRadius * 2,
        earthRadius * 2
      )

      ctx.restore()

      // Earth outline
      ctx.strokeStyle =
        "rgba(120,200,255,0.35)"

      ctx.lineWidth = 1.4

      ctx.beginPath()

      ctx.arc(
        earthX,
        earthY,
        earthRadius + 1,
        0,
        6.2832
      )

      ctx.stroke()

      // Spacecraft
      const angle = time * 0.9

      const spacecraftX =
        Math.cos(angle) * orbitWidth

      const spacecraftY =
        Math.sin(angle) * orbitHeight

      const shipX =
        earthX +
        spacecraftX * cosRotation -
        spacecraftY * sinRotation

      const shipY =
        earthY +
        spacecraftX * sinRotation +
        spacecraftY * cosRotation

      ctx.strokeStyle =
        "rgba(255,176,58,0.7)"

      ctx.lineWidth = 2

      ctx.beginPath()

      for (let i = 0; i < 26; i++) {
        const oldAngle =
          angle - i * 0.03

        const oldX =
          Math.cos(oldAngle) *
          orbitWidth

        const oldY =
          Math.sin(oldAngle) *
          orbitHeight

        const pointX =
          earthX +
          oldX * cosRotation -
          oldY * sinRotation

        const pointY =
          earthY +
          oldX * sinRotation +
          oldY * cosRotation

        ctx.globalAlpha =
          ((26 - i) / 26) * 0.7

        if (i === 0) {
          ctx.moveTo(pointX, pointY)
        } else {
          ctx.lineTo(pointX, pointY)
        }
      }

      ctx.stroke()

      ctx.globalAlpha = 1

      ctx.fillStyle = "#ffb03a"
      ctx.shadowColor = "#ffb03a"
      ctx.shadowBlur = 12

      ctx.beginPath()

      ctx.arc(
        shipX,
        shipY,
        3.6,
        0,
        6.2832
      )

      ctx.fill()

      ctx.shadowBlur = 0

      ctx.strokeStyle =
        "rgba(255,176,58,0.5)"

      ctx.lineWidth = 1

      ctx.beginPath()

      ctx.arc(
        shipX,
        shipY,
        7,
        0,
        6.2832
      )

      ctx.stroke()

      const altitude =
        38000 +
        Math.sin(time * 0.3) * 1400

      const velocity =
        2.39 +
        Math.cos(time * 0.5) * 0.12

      if (altitudeRef.current) {
        altitudeRef.current.innerHTML =
          Math.round(
            altitude
          ).toLocaleString() +
          " <u>km</u>"
      }

      if (velocityRef.current) {
        velocityRef.current.innerHTML =
          velocity.toFixed(3) +
          " <u>km/s</u>"
      }

      if (!reduceMotion) {
        animationId =
          requestAnimationFrame(draw)
      }
    }

    resizeCanvas()

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener(
      "resize",
      handleResize
    )

    if (reduceMotion) {
      draw()
    } else {
      animationId =
        requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(animationId)

      window.removeEventListener(
        "resize",
        handleResize
      )
    }
  }, [])

  return (
    <div className="stage">
      <canvas
        ref={canvasRef}
        className="orbit"
        width={1280}
        height={720}
      ></canvas>

      <div className="hud">
        <div className="rd tl">
          <span className="k">Altitude</span>
          <span
            className="v"
            ref={altitudeRef}
            style={{ color: "var(--cyan)" }}
          >
            -
          </span>
        </div>

        <div className="rd tr">
          <span className="k">Velocity</span>
          <span
            className="v"
            ref={velocityRef}
            style={{ color: "var(--amber)" }}
          >
            -
          </span>
        </div>

        <div className="rd bl">
          <span className="k">Inclination</span>

          <span className="v">
            21.3<u>&deg;</u>
          </span>
        </div>

        <div className="crumb">
          TRANS-LUNAR INJECTION - ARC 04
        </div>
      </div>
    </div>
  )
}
