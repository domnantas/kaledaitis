import { useState } from 'react'
import Footer from 'src/components/Footer/Footer'
import AboutUsModal from 'src/pages/HomePage/AboutUsModal/AboutUsModal'
import HeaderIcon from 'src/pages/HomePage/assets/HeaderIcon'

const DefaultLayout = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const openModal = () => {
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <HeaderIcon />
      {children}
      <Footer openAboutUsModal={openModal} />
      {isModalVisible && <AboutUsModal closeModal={closeModal} />}
    </>
  )
}

export default DefaultLayout
