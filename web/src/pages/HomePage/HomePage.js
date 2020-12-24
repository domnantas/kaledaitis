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
            {stage === 'landing' && <>artimieji per šventes per toli?</>}
            {stage === 'vardas' && (
              <>
                kas siunčia kalėdaitį?
                {!userName && (
                  <UserForm onSave={onSave} loading={loading} error={error} />
                )}
              </>
            )}
            {!!userName && <h2>{userName}</h2>}
          </div>
          <Kaledaitis onClick={cycleStages} />
          {stage === 'landing' && <div>pasidalink su jais kalėdaičiu!</div>}
          {!!userId && <div>spustelk kalėdaitį, norėdamas juo pasidalinti</div>}
        </Grid>
        <Footer openAboutUsModal={openModal} />
      </div>
    </DefaultLayout>
  )
}

export default HomePage
