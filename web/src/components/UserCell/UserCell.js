import { useMutation } from '@redwoodjs/web'

import UserForm from 'src/components/UserForm'

export const QUERY = gql`
  query FIND_USER_BY_ID($id: String!) {
    user: user(id: $id) {
      name
      sharedWith {
        name
      }
      takenFrom {
        name
      }
    }
  }
`

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>User not found</div>

export const Success = ({ user, id }) => {
  // If I already have an user (kaledaitis), do not ask for name
  const [currentUserId, setCurrentUserId] = React.useState(
    localStorage.getItem('userId')
  )

  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: (response) => {
      localStorage.setItem('userId', response.createUser.id)
      setCurrentUserId(response.createUser.id)
    },
  })

  const onSave = (input) => {
    createUser({ variables: { input } })
  }

  return (
    <>
      <p>Vardas: {user.name}</p>
      <p>Šio kalėdaičio atsilauže: {JSON.stringify(user.sharedWith)}</p>
      {id === currentUserId && (
        <p>Tu atsilaužei šiu kalėdaičių: {JSON.stringify(user.takenFrom)}</p>
      )}
      {id !== currentUserId && (
        <>
          {!currentUserId && (
            <UserForm onSave={onSave} loading={loading} error={error} />
          )}
          <button disabled={!currentUserId}>Atsilaužti</button>
        </>
      )}
    </>
  )
}
