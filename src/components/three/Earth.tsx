import { useRef } from "react"
import {
  useFrame,
  useLoader,
} from "@react-three/fiber"
import { TextureLoader } from "three"
import * as THREE from "three"

const EARTH_MAP =
  "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg"

export default function Earth() {
  const earthRef =
    useRef<THREE.Mesh>(null!)

  const texture =
    useLoader(
      TextureLoader,
      EARTH_MAP
    )

  useFrame((_, delta) => {
    earthRef.current.rotation.y +=
      delta * 0.05
  })

  return (
    <mesh ref={earthRef}>
      <sphereGeometry
        args={[2, 64, 64]}
      />

      <meshStandardMaterial
        map={texture}
        roughness={1}
        metalness={0}
      />
    </mesh>
  )
}
