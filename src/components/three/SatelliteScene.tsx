import {
  Suspense,
  useRef,
} from "react"

import {
  Canvas,
  useFrame,
} from "@react-three/fiber"

import {
  OrbitControls,
  Stars,
} from "@react-three/drei"

import * as THREE from "three"

import Earth from "./Earth"
import { satellites } from "@/data/satellites"
import type { Sat } from "@/types"

interface OrbiterProps {
  sat: Sat
  active: boolean
  onSelect: () => void
}

function Orbiter({
  sat,
  active,
  onSelect,
}: OrbiterProps) {
  const groupRef =
    useRef<THREE.Group>(null!)

  const radius =
    sat.orbit.radius

  const speed =
    sat.orbit.speed

  const phase =
    sat.orbit.phase

  useFrame((state) => {
    const time =
      state.clock.elapsedTime *
        speed +
      phase

    const x =
      Math.cos(time) * radius

    const z =
      Math.sin(time) * radius

    groupRef.current.position.set(
      x,
      0,
      z
    )
  })

  return (
    <group
      rotation={[
        sat.orbit.inclination,
        0,
        0,
      ]}
    >
      <mesh
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <ringGeometry
          args={[
            radius - 0.004,
            radius + 0.004,
            128,
          ]}
        />

        <meshBasicMaterial
          color={sat.color}
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      <group ref={groupRef}>
        <mesh
          onClick={onSelect}
          scale={active ? 1.8 : 1}
        >
          <sphereGeometry
            args={[0.07, 16, 16]}
          />

          <meshStandardMaterial
            color={sat.color}
            emissive={sat.color}
            emissiveIntensity={
              active ? 2.5 : 0.7
            }
          />
        </mesh>
      </group>
    </group>
  )
}

interface Props {
  activeId: string | null
  onSelect: (id: string) => void
}

export default function SatelliteScene({
  activeId,
  onSelect,
}: Props) {
  return (
    <Canvas
      camera={{
        position: [0, 2, 8],
        fov: 45,
      }}
    >
      <ambientLight intensity={0.3} />

      <directionalLight
        position={[5, 3, 5]}
        intensity={1.5}
      />

      <Stars
        radius={100}
        depth={50}
        count={4000}
        factor={4}
        fade
        speed={1}
      />

      <Suspense fallback={null}>
        <Earth />

        {satellites.map(
          (satellite) => (
            <Orbiter
              key={satellite.id}
              sat={satellite}
              active={
                activeId ===
                satellite.id
              }
              onSelect={() =>
                onSelect(
                  satellite.id
                )
              }
            />
          )
        )}
      </Suspense>

      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={14}
      />
    </Canvas>
  )
}
