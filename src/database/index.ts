import { sequelize } from './connection'
import { ReviewModel } from './db-models/review'
import { EndingModel } from './db-models/ending'
import { UserModel } from './db-models/user'

const sql = sequelize

export { sql, ReviewModel, EndingModel, UserModel }
