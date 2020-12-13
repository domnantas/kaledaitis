import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'

import Grid from './Grid/Grid'
import UserForm from 'src/components/UserForm'
import Kaledaitis from './assets/Kaledaitis'
import HeaderIcon from './assets/HeaderIcon'

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

const HomePage = () => {
  // If I already have an user (kaledaitis), redirect to UserPage
  React.useEffect(() => {
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

  const [stage, setStage] = React.useState('landing')

  return (
    <>
      <HeaderIcon />
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
        <Kaledaitis setStage={setStage} />
        <div>{stage === 'landing' && <>pasidalink su jais kalėdaičiu!</>}</div>
      </Grid>
    </>
  )
}

export default HomePage
