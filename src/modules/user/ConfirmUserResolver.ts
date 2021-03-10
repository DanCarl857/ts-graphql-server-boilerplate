import { Resolver, Mutation, Arg } from 'type-graphql'
import { ConfirmUserInput } from './input/ConfirmUserInput'

import { redis } from './../../redis'
import { User } from '../../entity/User'

@Resolver()
export class ConfirmUserResolver {

    @Mutation(() => Boolean, { nullable: true })
    async confirmUser(@Arg('input') input: ConfirmUserInput): Promise<Boolean | string> {

        const userId = await redis.get(input.token)

        if (!userId) {
            return false
        }

        await User.update({id: userId as any}, { confirmed: true })
        await redis.del(input.token)

        return true
    }
}