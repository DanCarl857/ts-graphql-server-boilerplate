import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { ChangePasswordInput } from './input/ChangePasswordInput'

import bcrypt from 'bcryptjs'
import { redis } from './../../redis'
import { User } from '../../entity/User'
import { forgotPasswordPrefix } from './../../constants/redisPrefixes'
import { UserPayload } from './payload/UserPayload'
import { MyContext } from './../../types/MyContext'

@Resolver()
export class ChangePasswordResolver {

    @Mutation(() => UserPayload, { nullable: true })
    async changePassword(@Arg('input') input: ChangePasswordInput,
    @Ctx() ctx: MyContext): Promise<UserPayload | null> {
        const userId = await redis.get(forgotPasswordPrefix + input.token)

        if (!userId) {
            return null
        }

        const user = await User.findOne(userId)

        if (!user) {
            return null
        }
        await redis.del(forgotPasswordPrefix + input.token)
        user.password = await bcrypt.hash(input.password, 12)
        await user.save()

        ctx.req.session!.userId = user.id

        return Object.assign(new UserPayload, { user })
    }
}