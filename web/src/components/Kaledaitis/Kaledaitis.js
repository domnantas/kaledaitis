import { Canvas, useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import { useSpring, animated } from 'react-spring/three'
import { useMove } from 'react-use-gesture'
import './Kaledaitis.css'

import displacement from 'src/assets/displacement.png'
import normal from 'src/assets/normal.png'
import { Suspense, useEffect } from 'react'

const KaledaitisBox = (props) => {
  const displacementTexture = useLoader(THREE.TextureLoader, displacement)
  const normalTexture = useLoader(THREE.TextureLoader, normal)

  return (
    <animated.mesh rotation={props.rotation}>
      <boxBufferGeometry args={[2.2, 3.2, 0.08, 1024, 1024]} />
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
  const [props, set] = useSpring(() => ({
    rotation: [0.5, 0.5, 0],
    config: { mass: 5, tension: 350, friction: 40 },
  }))

  useMove(
    ({ xy: [px, py] }) => {
      const xPush = (px - window.innerWidth / 2) / 600
      const yPush = (py - window.innerHeight / 2) / 600
      set({ rotation: [yPush, xPush, 0] })
    },
    { domTarget: window }
  )

  return (
    <div className="kaledaitis-container">
      <Canvas camera={{ fov: 60 }} concurrent>
        <Suspense fallback={null}>
          <pointLight intensity={1} position={[7, 5, 1]} />
          <ambientLight intensity={0.1} />
          <directionalLight position={[8, 2, 0]} />
          <hemisphereLight intensity={0.2} />
          <KaledaitisBox rotation={props.rotation} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Kaledaitis
