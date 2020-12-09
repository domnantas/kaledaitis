export const QUERY = gql`
  query FIND_USER_BY_ID($id: String!) {
    user: user(id: $id) {
      name
      sharedWith {
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>User not found</div>

export const Success = ({ user }) => {
  return (
    <>
      <p>mano vardas: {user.name}</p>
      <p>sio kaledaicio atsilauze: {JSON.stringify(user.sharedWith)}</p>
    </>
  )
}
