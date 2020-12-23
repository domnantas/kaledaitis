import UserCell from 'src/components/UserCell'
import DefaultLayout from 'src/layouts/DefaultLayout/DefaultLayout'

const UserPage = ({ id }) => {
  return (
    <DefaultLayout>
      <UserCell id={id} />
    </DefaultLayout>
  )
}

export default UserPage
