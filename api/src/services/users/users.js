import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findOne({
    where: { id },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const takeFromUser = ({ id, input }) => {
  if (id === input.id) throw Error('Cannot take from yourself')
  return db.user.update({
    data: { takenFrom: { connect: { id: input.id } } },
    where: { id: id },
  })
}

export const User = {
  sharedWith: (_obj, { root }) =>
    db.user.findOne({ where: { id: root.id } }).sharedWith(),
  takenFrom: (_obj, { root }) =>
    db.user.findOne({ where: { id: root.id } }).takenFrom(),
}
