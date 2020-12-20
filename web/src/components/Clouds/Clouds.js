import { Canvas } from 'react-three-fiber'
import { BackSide, Color } from 'three'
import Cloud from 'src/components/Cloud/Cloud'
import './Clouds.css'
import environmentVertexShader from 'src/shaders/environment.vert'
import environmentFragmentShader from 'src/shaders/environment.frag'

const Clouds = () => {
  const radius = 8

  const uniforms = {
    uTopColor: { value: new Color('#4b9fe3') },
    uBottomColor: { value: new Color('#c68edf') },
    uSpot1Color: { value: new Color('#7d72ff') },
    uSpot1Position: { value: [0.4, 0.7] },
    uSpot2Color: { value: new Color('#f59578') },
    uSpot2Position: { value: [0.4, 0.4] },
  }

  return (
    <div className="cloud-container">
      <Canvas camera={{ position: [0, 1, 3] }}>
        <mesh rotation={[0, 0, 0.12]}>
          <sphereBufferGeometry attach="geometry" args={[radius, 30, 30]} />
          <shaderMaterial
            args={[
              {
                uniforms: uniforms,
                vertexShader: environmentVertexShader,
                fragmentShader: environmentFragmentShader,
              },
            ]}
            side={BackSide}
            attach="material"
          />
        </mesh>
        <Cloud
          size={[5, 5]}
          position={[2, 2]}
          additionalUniforms={{
            uTimeFactor1: { value: 0.001 },
            uTimeFactor2: { value: 0.002 },
          }}
        />
        <Cloud
          size={[5, 3]}
          position={[-2.5, 1.4]}
          additionalUniforms={{
            uTimeFactor1: { value: 0.0012 },
            uTimeFactor2: { value: 0.0028 },
          }}
        />
        <Cloud
          size={[15, 7]}
          position={[0, -2]}
          additionalUniforms={{
            uTimeFactor1: { value: 0.0018 },
            uTimeFactor2: { value: 0.0004 },
            uDisplStrenght1: { value: 0.03 },
          }}
        />
      </Canvas>
    </div>
  )
}

export default Clouds
