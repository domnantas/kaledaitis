import { useEffect, useState, useLayoutEffect } from 'react'
import { useQuery, useMutation } from '@redwoodjs/web'

import UserForm from 'src/components/UserForm'
import Grid from 'src/components/Grid'
import ShareLink from 'src/components/ShareComponent/ShareLink'
import Kaledaitis from 'src/components/Kaledaitis'
import './UserCell.css'

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
  function useMediaQuery() {
    const [screenSize, setScreenSize] = useState([0, 0])

    useLayoutEffect(() => {
      function updateScreenSize() {
        setScreenSize([window.innerWidth, window.innerHeight])
      }
      window.addEventListener('resize', updateScreenSize)
      updateScreenSize()
      return () => window.removeEventListener('resize', updateScreenSize)
    }, [])

    return screenSize
  }

  const [width] = useMediaQuery()

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

  const [showMobileList, setShowMobileList] = useState(false)

  const CloseButton = () => (
    <svg
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="close-btn"
      onClick={() => setShowMobileList(false)}
    >
      <path d="M1 1L23 21" stroke="black" />
      <path d="M23 1L1 21" stroke="black" />
    </svg>
  )

  const MobileList = () => (
    <div className="mobile-list">
      <CloseButton />
      <h2>šio kalėdaičio atsilaužė:</h2>
      {!!user.sharedWith.length && (
        <ul className="list">
          {user.sharedWith.map((user) => (
            <li className="list-item" key={user.id}>
              {user.name}{' '}
            </li>
          ))}
        </ul>
      )}
      {!user.sharedWith.length && (
        <>
          <p>čia matysi vardus tų, kurie atsilauš tavo kaledaičio.</p>
          <p>būk kantrus!</p>
        </>
      )}
    </div>
  )

  const Left = () => (
    <div>
      {id !== currentUserId && (
        <h1>
          <i>{user.name}</i> su tavimi pasidalino kalėdaičiu!
        </h1>
      )}

      {(id === currentUserId || alreadyTaken()) && width > 768 && (
        <div>
          <h2>šio kalėdaičio atsilaužė:</h2>
          {!!user.sharedWith.length && (
            <ul className="list">
              {user.sharedWith.map((user) => (
                <li className="list-item" key={user.id}>
                  {user.name}
                </li>
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
      {(id === currentUserId || alreadyTaken()) && width < 768 && (
        <h2
          className="mobile-kas-atsilauze"
          onClick={() => setShowMobileList(true)}
        >
          {alreadyTaken()
            ? 'kas dar atsilaužė šio kalėdaičio?'
            : 'kas atsilaužė tavo kalėdaičio?'}
        </h2>
      )}
    </div>
  )

  const Right = () => (
    <div>
      {id === currentUserId && <ShareLink width={width} />}
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
    <>
      <Grid>
        <Left />
        <Kaledaitis isBorked={isBorked} onClick={onTakeClick} />
        <Right />
      </Grid>
      {width < 768 && showMobileList && <MobileList />}
    </>
  )
}
