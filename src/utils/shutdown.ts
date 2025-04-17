import { redis } from '../database/connection'
import { sequelize } from '../database/connection'
import { WORKERS } from '../workers/workers'

export const shutdown = async () => {
  sequelize.close()
  redis.save()
  const endingWorkers: Promise<void>[] = []
  WORKERS.forEach((worker) => {
    endingWorkers.push(worker.close())
  })
  await Promise.all(endingWorkers)
}
