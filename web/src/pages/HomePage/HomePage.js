import { useState, useEffect } from 'react'

import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'

import Grid from 'src/components/Grid'
import UserForm from 'src/components/UserForm'
import Footer from 'src/components/Footer/Footer'
import AboutUsModal from './AboutUsModal/AboutUsModal'
import DefaultLayout from 'src/layouts/DefaultLayout/DefaultLayout'
import './HomePage.css'
import Kaledaitis from 'src/components/Kaledaitis/Kaledaitis'

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
  }, [])

  const [userId, setUserId] = useState('')

  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: (response) => {
      localStorage.setItem('userId', response.createUser.id)
      setUserId(response.createUser.id)
    },
  })

  const [userName, setUserName] = useState('')

  const onSave = (input) => {
    setUserName(input.name)
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
        case 'vardas':
          return navigate(routes.user({ id: userId }))
        default:
          return 'landing'
      }
    })
  }

  return (
    <DefaultLayout>
      <div className="home-page">
        {isModalVisible && <AboutUsModal closeModal={closeModal} />}
        <Grid cycleStages={cycleStages}>
          <div>
            {stage === 'landing' && <h2>artimieji per šventes per toli?</h2>}
            {stage === 'vardas' && (
              <>
                <h2>kas siunčia kalėdaitį?</h2>
                {!userName && (
                  <UserForm onSave={onSave} loading={loading} error={error} />
                )}
              </>
            )}
            {!!userName && (
              <h2>
                <i>{userName}</i>
              </h2>
            )}
          </div>
          <Kaledaitis onClick={cycleStages} />
          {stage === 'landing' && <h2>pasidalink su jais kalėdaičiu!</h2>}
          {!!userId && <h2>spustelk kalėdaitį, norėdamas juo pasidalinti</h2>}
        </Grid>
        <Footer openAboutUsModal={openModal} />
      </div>
    </DefaultLayout>
  )
}

export default HomePage
