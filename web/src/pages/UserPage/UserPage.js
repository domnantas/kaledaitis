import UserCell from 'src/components/UserCell'

const UserPage = ({ id }) => {
  return (
    <>
      <h1>UserPage</h1>
      <UserCell id={id} />
    </>
  )
}

export default UserPage
