import { Queue, Worker } from 'bullmq'
import IORedis from 'ioredis'
import { Job } from '../types/job'
import { WORKERS } from './workers'

const connection = new IORedis({ maxRetriesPerRequest: null })

export const archiveMovieQueue = new Queue(Job.ArchiveMovie, { connection })

// just for testing - please ignore
export function createWorker(jobName: Job) {
  const archiveMovieWorker = new Worker(
    jobName,
    async (job) => {
      console.log('timeoutFcn job')
      const timeoutFcn = (): Promise<void> => {
        console.log('timeoutFcn')
        return new Promise((resolve, reject) => {
          console.log('timeoutFcn ----------')
          setTimeout(() => {
            console.log('movie archived', job.data)
            resolve()
          }, 100000)
        })
      }

      await timeoutFcn()
    },
    { connection, autorun: true },
  )

  archiveMovieWorker.on('active', (job) => {
    console.log('active', job.id)
  })

  archiveMovieWorker.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed with result: ${result}`)
  })

  archiveMovieWorker.on('failed', (jobId, error) => {
    console.log(`Job ${jobId} failed with error: ${error}`)
  })

  archiveMovieWorker.on

  WORKERS.push(archiveMovieWorker)
}

createWorker(Job.ArchiveMovie)
