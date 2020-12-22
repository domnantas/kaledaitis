import { useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import useTexture from 'src/hooks/useTexture'
import './Kaledaitis.css'

import displacement from 'src/assets/displacement.png'
import normal from 'src/assets/normal.png'

const KaledaitisBox = () => {
  // const displacementTexture = useLoader(THREE.TextureLoader, displacement)
  const displacementTexture = useTexture(displacement)
  const normalTexture = useTexture(normal)

  const mesh = useRef()
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })
  return (
    <mesh
      position={[0, 0, 0]}
      ref={mesh}
      // scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      // onClick={(event) => setActive(!active)}
      // onPointerOver={(event) => setHover(true)}
      // onPointerOut={(event) => setHover(false)}
    >
      <boxBufferGeometry args={[3, 4, 0.08]} />
      <meshStandardMaterial
        color="pink"
        displacementMap={displacementTexture}
        normalMap={normalTexture}
      />
    </mesh>
  )
}

const Kaledaitis = () => {
  return (
    <div className="kaledaitis-container">
      <Canvas>
        <ambientLight intensity={0.4} />
        <directionalLight position={[8, 2, 0]} />
        <KaledaitisBox />
      </Canvas>
    </div>
  )
}

export default Kaledaitis
