/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'string.required': 'Title is required alexhuynh',
      'string.empty': 'Title is not allowed to be empty',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title must be at most 50 characters long',
      'string.trim': 'Title must not contain leading or trailing spaces'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    // console.log('req.body: 'req.body)
    // dùng abortEarly khi có nhiều lỗi thì trả về tất cả lỗi
    // dùng stripUnknown để loại bỏ các trường không có trong schema
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // next()
    res.status(StatusCodes.CREATED).json({ messege: 'POST APIs from validation create new boards' })
  } catch (error) {
    // console.log(error)
    // console.log(new Error(error))
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}