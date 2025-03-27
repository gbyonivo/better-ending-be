import { DataTypes } from 'sequelize'
import { sequelize } from '../connection.js'
import { COMMON_TABLE_SETTINGS } from '../../utils/database'

export const EndingModel = sequelize.define(
  'Ending',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    movieId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    movieImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aiName: {
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
  },
  {
    tableName: 'ending',
    ...COMMON_TABLE_SETTINGS,
  },
)
