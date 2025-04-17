const commonModelFcn = {
  hasMany: jest.fn(() => ({})),
  belongsTo: jest.fn(() => ({})),
  hasOne: jest.fn(() => ({})),
  belongsToMany: jest.fn(() => ({})),
  init: jest.fn(() => ({})),
}

jest.mock('sequelize', () => {
  const actualSequelize = jest.requireActual('sequelize-mock')
  return {
    ...actualSequelize,
    Sequelize: jest.fn(() => ({
      ...actualSequelize.Sequelize,
      authenticate: jest.fn(() => Promise.resolve()),
      define: jest.fn(() => {}),
    })),
    DataTypes: {},
  }
})

jest.mock('redis', () => {
  const actualRedis = jest.requireActual('redis-mock')
  return {
    ...actualRedis,
    createClient: jest.fn(() => ({
      connect: jest.fn(() => Promise.resolve()),
      on: jest.fn(() => Promise.resolve()),
    })),
  }
})

jest.mock('redis', () => {
  const actualRedis = jest.requireActual('redis-mock')
  return {
    ...actualRedis,
    createClient: jest.fn(() => ({
      connect: jest.fn(() => Promise.resolve()),
      on: jest.fn(() => Promise.resolve()),
    })),
  }
})

jest.mock('./src/database/db-models/user', () => {
  return {
    UserModel: {
      ...commonModelFcn,
    },
  }
})

jest.mock('./src/database/db-models/review', () => {
  return {
    ReviewModel: {
      ...commonModelFcn,
    },
  }
})

jest.mock('./src/database/db-models/ending', () => {
  return {
    EndingModel: {
      ...commonModelFcn,
    },
  }
})

jest.mock('bullmq', () => {
  return {
    Queue: jest.fn().mockImplementation(() => {
      return {
        add: jest.fn(),
      }
    }),
    Worker: jest.fn().mockImplementation(() => {
      return {
        add: jest.fn(),
        on: jest.fn(),
      }
    }),
  }
})

jest.mock('ioredis', () => {
  const actualIORedis = jest.requireActual('ioredis-mock')
  return actualIORedis
})
