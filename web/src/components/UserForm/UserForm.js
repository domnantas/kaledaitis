import {
  Form,
  FormError,
  FieldError,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const UserForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.user?.id)
  }

  return (
    <Form onSubmit={onSubmit} error={props.error}>
      <FormError error={props.error} />

      <TextField
        name="name"
        placeholder="Įrašyk savo vardą čia"
        defaultValue={props.user?.name}
        validation={{ required: true }}
      />
      <FieldError name="name" />

      <Submit disabled={props.loading}>Išsaugoti</Submit>
    </Form>
  )
}

export default UserForm
