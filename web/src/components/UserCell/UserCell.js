import { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@redwoodjs/web'

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

  const { refetch } = useQuery(QUERY, { variables: { id } })

  const onTakeClick = () => {
    setIsBorked(true)
    takeFromUser({ variables: { id: currentUserId, input: { id } } })
    refetch()
  }

  const alreadyTaken = () =>
    user.sharedWith.some(
      (sharedWithUser) => sharedWithUser.id === currentUserId
    )

  const [isBorked, setIsBorked] = useState(false)

  useEffect(() => {
    if (id === currentUserId || alreadyTaken()) {
      setIsBorked(true)
    }
  }, [])

  const Left = () => (
    <div>
      {id !== currentUserId && (
        <h1>
          <i>{user.name}</i> su tavimi pasidalino kalėdaičiu!
        </h1>
      )}

      {(id === currentUserId || alreadyTaken()) && (
        <div>
          <h2>šio kalėdaičio atsilaužė:</h2>
          {!!user.sharedWith.length && (
            <ul>
              {user.sharedWith.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          )}
          {!user.sharedWith.length && (
            <p>
              čia matysi vardus tų, kurie atsilauš tavo kaledaičio. būk kantrus!
            </p>
          )}
        </div>
      )}
    </div>
  )

  const Right = () => (
    <div>
      {id === currentUserId && <ShareLink />}
      {id !== currentUserId && (
        <div>
          {!currentUserId && <h2>kas laužia kalėdaitį?</h2>}
          {!currentUserId && !currentUserName && (
            <UserForm onSave={onSave} loading={loading} error={error} />
          )}
          {currentUserId && !isBorked && (
            <h2>spustelk kalėdaitį, norėdamas jo atsilaužti</h2>
          )}
          {!!currentUserId && isBorked && (
            <h2>sėkmingai atsilaužei kalėdaičio!</h2>
          )}
        </div>
      )}
    </div>
  )

  return (
    <Grid>
      <Left />
      <Kaledaitis isBorked={isBorked} onClick={onTakeClick} />
      <Right />
    </Grid>
  )
}
