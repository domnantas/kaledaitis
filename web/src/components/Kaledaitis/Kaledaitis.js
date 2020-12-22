import { useRef } from 'react'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import './Kaledaitis.css'

import displacement from 'src/assets/displacement.png'
import normal from 'src/assets/normal.png'
import { Suspense } from 'react'
import { Box } from 'drei'

const KaledaitisBox = () => {
  const displacementTexture = useLoader(THREE.TextureLoader, displacement)
  const normalTexture = useLoader(THREE.TextureLoader, normal)

  const mesh = useRef()
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })
  return (
    <Box ref={mesh} args={[3, 4, 0.08, 1024, 1024]}>
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
    </Box>
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
