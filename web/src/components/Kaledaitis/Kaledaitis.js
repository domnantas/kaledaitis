import VanillaTilt from 'vanilla-tilt'
import { useEffect, useRef } from 'react'

const Kaledaitis = (props) => {
  const kaledaitisRef = useRef()

  useEffect(() => {
    VanillaTilt.init(kaledaitisRef.current, {
      gyroscope: true,
      'full-page-listening': true,
      speed: 600,
    })
  })

  return (
    <div ref={kaledaitisRef}>
      <img
        src={
          props.isBroken
            ? 'src/assets/kaledaitisbroken.png'
            : 'src/assets/kaledaitis.png'
        }
        onClick={props.onClick}
        style={{
          maxHeight: '70vh',
          cursor: props.isBroken ? 'default' : 'pointer',
        }}
      />
    </div>
  )
}

export default Kaledaitis
