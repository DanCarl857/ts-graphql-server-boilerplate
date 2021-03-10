import {v4} from 'uuid'
import { redis } from './../redis'

export const createConfirmationUrl = async (userId: string) => {
    const token = v4()
    await redis.set(token, userId, "expirationDate", 60*60*24)  // 1 day expiration

    return `http://localhost:4000/user/confirm/${token}`
}