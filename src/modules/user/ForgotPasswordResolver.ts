import { Resolver, Mutation, Arg } from 'type-graphql'
import { ForgotPasswordInput } from './input/ForgotPasswordInput'

import { redis } from './../../redis'
import { User } from '../../entity/User'
import { v4 } from 'uuid'
import { sendEmail } from './../../utils/sendEmail'
import { forgotPasswordPrefix } from './../../constants/redisPrefixes'

@Resolver()
export class ForgotPasswordResolver {

    @Mutation(() => Boolean, { nullable: true })
    async forgotPassword(@Arg('input') input: ForgotPasswordInput): Promise<Boolean | string> {
        const user = await User.findOne({ where: { email: input.email }})

        if (!user) {
            // We don't want to indicate that a user exists with this email
            return true
        }

        const token = v4()
        await redis.set(forgotPasswordPrefix + token, user.id as any, "expiration", 60 * 60 * 24)
        await sendEmail(user.email, `http://localhost:3000/user/change-password/${token}`)

        return true
    }
}