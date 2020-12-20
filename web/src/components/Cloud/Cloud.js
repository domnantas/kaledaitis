import { useFrame } from 'react-three-fiber'
import { ShaderMaterial, UniformsUtils, ShaderLib } from 'three'
import useTexture from 'src/hooks/useTexture'

import cloudMask from 'src/assets/cloudMask.jpg'
import cloudNoise from 'src/assets/cloudNoise.jpg'

import cloudFragmentShader from 'src/shaders/cloud.frag'
import cloudVertexShader from 'src/shaders/cloud.vert'

const Cloud = ({ size = [2, 2], position = [0, 0], additionalUniforms }) => {
  const cloudMaskTexture = useTexture(cloudMask)
  const cloudNoiseTexture = useTexture(cloudNoise)

  const uniforms = {
    uTime: { value: 0 },
    uTxtShape: { value: cloudMaskTexture },
    uTxtCloudNoise: { value: cloudNoiseTexture },
    uFac1: { value: 17.8 },
    uFac2: { value: 2.7 },
    uTimeFactor1: { value: 0.002 },
    uTimeFactor2: { value: 0.0015 },
    uDisplStrenght1: { value: 0.04 },
    uDisplStrenght2: { value: 0.08 },
    ...additionalUniforms,
  }

  const material = new ShaderMaterial({
    uniforms: {
      ...UniformsUtils.clone(ShaderLib.sprite.uniforms),
      ...uniforms,
    },
    vertexShader: cloudVertexShader,
    fragmentShader: cloudFragmentShader,
    transparent: true,
  })

  useFrame(() => {
    if (material) {
      material.uniforms.uTime.value += 1
    }
  })

  return (
    <group>
      <mesh position={[...position, 0]} scale={[...size, 1]}>
        <planeBufferGeometry args={[1, 1]} attach="geometry" />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  )
}

export default Cloud
