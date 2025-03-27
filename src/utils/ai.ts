import OpenAI from 'openai'
import { DEEPSEEK_SECRET, OPEN_AI_SECRET } from './config'

export const OPEN_AI = new OpenAI({
  apiKey: OPEN_AI_SECRET,
})

export const DEEPSEEK_AI = new OpenAI({
  apiKey: DEEPSEEK_SECRET,
  baseURL: 'https://api.deepseek.com',
})

export const OPEN_AI_MODEL = 'gpt-4o'
export const DEEPSEEK_MODEL = 'deepseek-chat'
