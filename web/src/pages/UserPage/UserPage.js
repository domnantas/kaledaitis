import UserCell from 'src/components/UserCell'
import DefaultLayout from 'src/layouts/DefaultLayout/DefaultLayout'
import Grid from '../HomePage/Grid/Grid'

import './UserPage.css'

const UserPage = ({ id }) => {
  return (
    <DefaultLayout>
      <Grid>
        <div>
          <UserCell id={id} />
        </div>
        <div>qwer</div>
      </Grid>
    </DefaultLayout>
  )
}

export default UserPage
