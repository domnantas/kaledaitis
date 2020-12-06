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
  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: (response) => {
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
