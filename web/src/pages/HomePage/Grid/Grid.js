import './Grid.css'
import VanillaTilt from 'vanilla-tilt'
import { useEffect, useRef } from 'react'

const Grid = (props) => {
  const kaledaitisRef = useRef()

  useEffect(() => {
    VanillaTilt.init(kaledaitisRef.current, {
      gyroscope: true,
      'full-page-listening': true,
      speed: 600,
    })
  })

  return (
    <div className="Grid">
      {props.children[0]}
      <div ref={kaledaitisRef}>
        <img
          src="src/assets/kaledaitis.png"
          onClick={props.cycleStages}
          style={{ maxHeight: '70vh' }}
        />
      </div>
      {/* <Kaledaitis /> */}
      {props.children[1]}
    </div>
  )
}

export default Grid
