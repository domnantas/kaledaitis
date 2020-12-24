import { useState } from 'react'
import { useMutation } from '@redwoodjs/web'

import UserForm from 'src/components/UserForm'
import Grid from 'src/components/Grid'
import ShareLink from 'src/components/ShareComponent/ShareLink'
import Kaledaitis from 'src/components/Kaledaitis'

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
  const [currentUserId, setCurrentUserId] = useState(
    localStorage.getItem('userId')
  )

  const [currentUserName, setCurrentUserName] = useState('')

  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: (response) => {
      localStorage.setItem('userId', response.createUser.id)
      setCurrentUserId(response.createUser.id)
    },
  })

  const onSave = (input) => {
    setCurrentUserName(input.name)
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

  const Left = () => (
    <div>
      {id !== currentUserId && (
        <h1>{user.name} su tavimi pasidalino kalėdaičiu!</h1>
      )}

      {(id === currentUserId || alreadyTaken()) && (
        <div>
          <h2>tavo kalėdaičio atsilaužė:</h2>
          {!!user.sharedWith.length && (
            <ul>
              {user.sharedWith.map((user) => (
                <li key={user.name}>{user.name}</li>
              ))}
            </ul>
          )}
          {!user.sharedWith.length &&
            'čia matysi vardus tų, kurie\natsilauš tavo kaledaičio.'}
        </div>
      )}
    </div>
  )

  const Right = () => (
    <div>
      {id === currentUserId && <ShareLink />}
      {id !== currentUserId && (
        <div>
          <h2>kas laužia kalėdaitį?</h2>
          {!currentUserId && !currentUserName && (
            <UserForm onSave={onSave} loading={loading} error={error} />
          )}
          {!!currentUserName && <div>{currentUserName}</div>}
          <button
            disabled={!currentUserId || takeFromUserLoading || alreadyTaken()}
            onClick={onTakeClick}
          >
            {alreadyTaken() ? 'Jau atsilaužei šito' : 'Atsilaužti'}
          </button>
        </div>
      )}
    </div>
  )

  return (
    <Grid>
      <Left />
      <Kaledaitis isBorked />
      <Right />
    </Grid>
  )
}
