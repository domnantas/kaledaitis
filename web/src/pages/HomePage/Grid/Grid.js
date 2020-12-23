import './Grid.css'
import Kaledaitis from 'src/pages/HomePage/assets/Kaledaitis'

const Grid = (props) => {
  return (
    <div className="Grid">
      {props.children[0]}
      <Kaledaitis updateStage={props.cycleStages} />
      {props.children[1]}
    </div>
  )
}

export default Grid
