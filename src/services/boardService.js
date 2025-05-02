/* eslint-disable no-useless-catch */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { slugify } from '~/utils/formatter'
import { boardModel } from '~/models/boardModel'
import { GET_DB } from '~/config/mongodb'

const createNew = async (reqBody) => {
  // console.log('boardService.createNew được gọi với:', reqBody)
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    const createBoard = await boardModel.createNew(newBoard)
    console.log(createBoard)

    const getNewBoard = await boardModel.findOneById(createBoard.insertedId)
    console.log('getNewBoard: ', getNewBoard)

    return getNewBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew
}