import Clouds from 'src/components/Clouds'
import Kaledaitis from 'src/components/Kaledaitis'

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Clouds />
      {/* <Kaledaitis /> */}
      {children}
    </>
  )
}

export default DefaultLayout
