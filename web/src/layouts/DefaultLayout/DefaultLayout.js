import Clouds from 'src/components/Clouds'

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Clouds />
      {children}
    </>
  )
}

export default DefaultLayout
