/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = async () => {
  const app = express()
  // Enble req.body
  app.use(express.json())

  // Dùng APIs v1
  app.use('/v1', APIs_V1)

  // Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  const hostname = 'localhost'
  const port = 8017

  app.get('/', async(req, res) => {

    // console.log(await GET_DB().listCollections().toArray())
    // process.exit(0)
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Hello ${env.AUTHOR}, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`)
  })

  // Thực hiện tác vụ clenup trước khi dừng sever lại
  exitHook(() => {
    CLOSE_DB()
    console.log('4. Closed connection to MongoDB Atlas...')
  })
}



// IIFE (Immediately Invoked Function Expression )
(async () => {
  try {
    console.log('1. Connecting to MongoDB Atlas...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Atlas...')

    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// console.log('1. Connecting successfully to MongoDB Atlas!!!')
// CONNECT_DB()
//   .then(() => console.log('2. Connected successfully to MongoDB Atlas...'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })
