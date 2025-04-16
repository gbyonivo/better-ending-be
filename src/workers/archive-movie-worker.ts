import { Worker } from 'bullmq'
import IORedis from 'ioredis'
import { Job } from '../types/job'

const connection = new IORedis({ maxRetriesPerRequest: null })

export const archiveMovieWorker = new Worker(
  Job.ArchiveMovie,
  async (job) => {
    const { movie } = job.data
    const timeoutFcn = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('movie archived', movie)
          resolve()
        }, 10000)
      })
    }

    await timeoutFcn()
  },
  { connection },
)
