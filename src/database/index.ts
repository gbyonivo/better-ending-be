import { sequelize } from './connection'
import { ReviewModel } from './db-models/review'
import { EndingModel } from './db-models/ending'
import { UserModel } from './db-models/user'

const sql = sequelize

UserModel.hasMany(EndingModel, {
  foreignKey: 'userId',
  as: 'endings',
})

ReviewModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  as: 'user',
})

ReviewModel.belongsTo(EndingModel, {
  foreignKey: 'endingId',
  as: 'ending',
})

export { sql, ReviewModel, EndingModel, UserModel }
