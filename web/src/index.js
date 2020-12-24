import ReactDOM from 'react-dom'
import { RedwoodProvider, FatalErrorBoundary } from '@redwoodjs/web'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import angeliukasLeft from 'src/assets/angeliukasLeft.png'
import angeliukasRight from 'src/assets/angeliukasRight.png'
import Routes from 'src/Routes'

import './index.css'
import Clouds from './components/Clouds/Clouds'

ReactDOM.render(
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider>
      <img src={angeliukasLeft} className="angeliukas angeliukas-left" />
      <img src={angeliukasRight} className="angeliukas angeliukas-right" />
      <Clouds />
      <Routes />
    </RedwoodProvider>
  </FatalErrorBoundary>,
  document.getElementById('redwood-app')
)
