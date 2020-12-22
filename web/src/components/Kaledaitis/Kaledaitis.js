import { useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import './Kaledaitis.css'

const KaledaitisBox = () => {
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
      <meshStandardMaterial color="pink" />
    </mesh>
  )
}

const Kaledaitis = () => {
  return (
    <div className="kaledaitis-container">
      <Canvas>
        <ambientLight intensity={1} />
        {/* <rectAreaLight
          width={6}
          height={6}
          brightness={1000}
          color={'blue'}
          position={[4, 0, 0]}
          lookAt={[0, 0, 0]}
          penumbra={1}
          castShadow
        /> */}
        <pointLight position={[3, 0, 0]} color={'white'} />
        <KaledaitisBox />
      </Canvas>
    </div>
  )
}

export default Kaledaitis
