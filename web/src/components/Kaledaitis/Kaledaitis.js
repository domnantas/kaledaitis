import VanillaTilt from 'vanilla-tilt'
import { useEffect, useRef } from 'react'

import kaledaitisImg from 'src/assets/kaledaitis.png'
import kaledaitisBorkedImg from 'src/assets/kaledaitisborked.png'

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
    <div ref={kaledaitisRef} onClick={() => props.setIsBorked(true)}>
      <img
        src={props.isBorked ? kaledaitisBorkedImg : kaledaitisImg}
        onClick={props.onClick}
        style={{
          maxHeight: '70vh',
          cursor: props.isBorked ? 'default' : 'pointer',
        }}
      />
    </div>
  )
}

export default Kaledaitis
