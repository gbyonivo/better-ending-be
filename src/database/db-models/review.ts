import { DataTypes } from 'sequelize'
import { sequelize } from '../connection.js'
import { COMMON_TABLE_SETTINGS } from '../../utils/database.js'

export const ReviewModel = sequelize.define(
  'Review',
  {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    endingId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
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
  },
  {
    tableName: 'review',
    ...COMMON_TABLE_SETTINGS,
  },
)
