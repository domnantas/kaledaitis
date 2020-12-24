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
    <div ref={kaledaitisRef}>
      {props.isBorked ? (
        <img
          src={kaledaitisBorkedImg}
          onClick={props.onClick}
          style={{
            maxHeight: '70vh',
          }}
        />
      ) : (
        <img
          src={kaledaitisImg}
          onClick={props.onClick}
          style={{
            maxHeight: '70vh',
            cursor: 'pointer',
          }}
        />
      )}
    </div>
  )
}

export default Kaledaitis
