// src/mocks/handlers.js
import { rest } from 'msw'
import {loginHandler} from './loginHandlers'

export const handlers = [
  ...loginHandler
]