import { useMutation } from '@redwoodjs/web'

import UserForm from 'src/components/UserForm'

export const QUERY = gql`
  query FIND_USER_BY_ID($id: String!) {
    user: user(id: $id) {
      name
      sharedWith {
        id
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

const TAKE_FROM_USER_MUTATION = gql`
  mutation TakeFromUserMutation($id: String!, $input: takeFromUserInput!) {
    takeFromUser(id: $id, input: $input) {
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

  const [takeFromUser, { takeFromUserLoading }] = useMutation(
    TAKE_FROM_USER_MUTATION
  )

  const onTakeClick = () => {
    takeFromUser({ variables: { id: currentUserId, input: { id } } })
  }

  const alreadyTaken = () =>
    user.sharedWith.some(
      (sharedWithUser) => sharedWithUser.id === currentUserId
    )

  return (
    <>
      <h1>{user.name}</h1>
      <p>
        Šio kalėdaičio atsilauže:{' '}
        {user.sharedWith.length
          ? user.sharedWith.map((user) => user.name)
          : 'niekas'}
      </p>
      {id === currentUserId && (
        <p>
          Tu atsilaužei šiu kalėdaičių:{' '}
          {user.takenFrom.length
            ? user.takenFrom.map((user) => user.name)
            : 'neatsilaužei dar'}
        </p>
      )}
      {id !== currentUserId && (
        <>
          {!currentUserId && (
            <UserForm onSave={onSave} loading={loading} error={error} />
          )}
          <button
            disabled={!currentUserId || takeFromUserLoading || alreadyTaken()}
            onClick={onTakeClick}
          >
            {alreadyTaken() ? 'Jau atsilaužei šito' : 'Atsilaužti'}
          </button>
        </>
      )}
    </>
  )
}
