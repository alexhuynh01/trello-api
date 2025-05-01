/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'

let trelloDatabaseInstance = null


// khởi tạo instance để kết nối tới mongodb
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
// Kết nối DB
export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// khóa tạo instance để kết nối tới mongodb
export const GET_DB = () => {
  if (!trelloDatabaseInstance) {
    throw new Error('Please connect to database first')
  }
  return trelloDatabaseInstance
}
//Đóng kết nối DB
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}