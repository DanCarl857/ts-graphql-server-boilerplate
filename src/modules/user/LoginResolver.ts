import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import bcrypt from 'bcryptjs'

import { LoginPayload } from './payload/LoginPayload'
import { LoginInput } from './input/LoginInput'
import { User } from './../../entity/User'
import { MyContext } from '../../types/MyContext'

@Resolver()
export class LoginResolver {

    @Mutation(() => LoginPayload, { nullable: true })
    async login(@Arg('input') input: LoginInput, @Ctx() ctx: MyContext): Promise<LoginPayload | null> {

        const user = await User.findOne({ where: { email: input.email }})
        if (!user) {
            return null
        }

        const valid = await bcrypt.compare(input.password, user.password )
        if (!valid) { return null }

        if (!user.confirmed) { return null }

        ctx.req.session!.userId = user.id

        return Object.assign(new LoginPayload, { user })
    }
}