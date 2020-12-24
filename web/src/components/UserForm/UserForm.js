import { Form, FormError, TextField, Submit } from '@redwoodjs/forms'

import './UserForm.css'

const UserForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.user?.id)
  }

  return (
    <Form onSubmit={onSubmit} error={props.error} className="form">
      <FormError error={props.error} />

      <TextField
        name="name"
        placeholder="Įrašyk savo vardą čia"
        defaultValue={props.user?.name}
        errorClassName="input input-error"
        validation={{ required: true }}
        className="input"
      />

      <Submit className="submit" disabled={props.loading}>
        {'>'}
      </Submit>
    </Form>
  )
}

export default UserForm
