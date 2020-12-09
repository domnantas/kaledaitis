import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'

import UserForm from 'src/components/UserForm'

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
    const userId = localStorage.getItem('userId')
    if (userId) navigate(routes.user({ id: userId }))
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

  return (
    <>
      <h1>HomePage</h1>
      <UserForm onSave={onSave} loading={loading} error={error} />
    </>
  )
}

export default HomePage
