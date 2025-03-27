import { DataTypes } from 'sequelize'
import { sequelize } from '../connection.js'
import { COMMON_TABLE_SETTINGS } from '../../utils/database'

export const UserModel = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loginType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'user',
    ...COMMON_TABLE_SETTINGS,
  },
)
