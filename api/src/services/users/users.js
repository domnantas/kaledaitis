import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const User = {
  sharedWith: (_obj, { root }) =>
    db.user.findOne({ where: { id: root.id } }).sharedWith(),
  takenFrom: (_obj, { root }) =>
    db.user.findOne({ where: { id: root.id } }).takenFrom(),
}
