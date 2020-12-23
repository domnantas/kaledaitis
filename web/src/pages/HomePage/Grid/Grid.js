import './Grid.css'
import VanillaTilt from 'vanilla-tilt'
import { useEffect, useRef } from 'react'

const Grid = (props) => {
  const kaledaitisRef = useRef()

  useEffect(() => {
    VanillaTilt.init(kaledaitisRef.current)
  })

  return (
    <div className="Grid">
      {props.children[0]}
      <img
        src="src/assets/kaledaitis.png"
        ref={kaledaitisRef}
        onClick={props.cycleStages}
        style={{ maxHeight: '70vh' }}
      />
      {/* <Kaledaitis /> */}
      {props.children[1]}
    </div>
  )
}

export default Grid
