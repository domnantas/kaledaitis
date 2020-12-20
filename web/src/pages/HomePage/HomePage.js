import { useState, useEffect } from 'react'

import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'

import Grid from './Grid/Grid'
import UserForm from 'src/components/UserForm'
import Kaledaitis from './assets/Kaledaitis'
import Footer from 'src/components/Footer/Footer'
import HeaderIcon from './assets/HeaderIcon'
import AboutUsModal from './AboutUsModal/AboutUsModal'
import './HomePage.css'

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

const HomePage = () => {
  // If I already have an user (kaledaitis), redirect to UserPage
  useEffect(() => {
    const currentUserId = localStorage.getItem('userId')
    if (currentUserId) navigate(routes.user({ id: currentUserId }))
  })

  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: (response) => {
      localStorage.setItem('userId', response.createUser.id)
      navigate(routes.user({ id: response.createUser.id }))
    },
  })

  const onSave = (input) => {
    createUser({ variables: { input } })
  }

  const [stage, setStage] = useState('landing')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const openModal = () => {
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  const cycleStages = () => {
    setStage(() => {
      switch (stage) {
        case 'landing':
          return 'vardas'
        default:
          return 'landing'
      }
    })
  }

  return (
    <>
      <div className="home-page">
        <HeaderIcon />
        {isModalVisible && <AboutUsModal closeModal={closeModal} />}
        <Grid>
          <div>
            {stage === 'landing' && <>artimieji per šventes per toli?</>}
            {stage === 'vardas' && (
              <>
                kas siunčia kalėdaitį?
                <UserForm onSave={onSave} loading={loading} error={error} />
              </>
            )}
          </div>
          <Kaledaitis updateStage={cycleStages} />
          <div>
            {stage === 'landing' && <>pasidalink su jais kalėdaičiu!</>}
          </div>
        </Grid>
        <Footer openAboutUsModal={openModal} />
      </div>
    </>
  )
}

export default HomePage
