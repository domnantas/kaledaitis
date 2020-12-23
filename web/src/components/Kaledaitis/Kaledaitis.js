import { useRef } from 'react'
import { Canvas, useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import { useSpring, animated } from 'react-spring/three'
import { useMove } from 'react-use-gesture'
import './Kaledaitis.css'

import displacement from 'src/assets/displacement.png'
import normal from 'src/assets/normal.png'
import { Suspense } from 'react'

const KaledaitisBox = () => {
  const displacementTexture = useLoader(THREE.TextureLoader, displacement)
  const normalTexture = useLoader(THREE.TextureLoader, normal)

  const mesh = useRef()
  const [props, set] = useSpring(() => ({
    rotation: [0, 0, 0],
    config: { mass: 5, tension: 350, friction: 40 },
  }))

  const bind = useMove(({ xy: [px, py] }) => {
    const xPush = (px - window.innerWidth / 2) / 1000
    const yPush = (py - window.innerHeight / 2) / 1000
    set({ rotation: [yPush, xPush, 0] })
  })

  return (
    <animated.mesh {...bind()} rotation={props.rotation} ref={mesh}>
      <boxBufferGeometry args={[3, 4, 0.08, 1024, 1024]} />
      <meshStandardMaterial attachArray="material" color="pink" />
      <meshStandardMaterial attachArray="material" color="pink" />
      <meshStandardMaterial attachArray="material" color="pink" />
      <meshStandardMaterial attachArray="material" color="pink" />
      <meshStandardMaterial
        attachArray="material"
        color="pink"
        displacementMap={displacementTexture}
        displacementScale={0.1}
        normalMap={normalTexture}
      />
      <meshStandardMaterial attachArray="material" color="pink" />
    </animated.mesh>
  )
}

const Kaledaitis = () => {
  return (
    <div className="kaledaitis-container">
      <Canvas>
        <Suspense fallback={null}>
          <pointLight intensity={1} position={[7, 5, 1]} />
          <ambientLight intensity={0.1} />
          <directionalLight position={[8, 2, 0]} />
          <hemisphereLight intensity={0.2} />
          <KaledaitisBox />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Kaledaitis
