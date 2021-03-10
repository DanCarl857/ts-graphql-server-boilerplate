import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql'
import bcrypt from 'bcryptjs'

import { RegisterPayload } from './payload/RegisterPayload'
import { RegisterInput } from './input/RegisterInput'
import { User } from './../../entity/User'
import { sendEmail } from './../../utils/sendEmail'
import { createConfirmationUrl } from './../../utils/createConfirmationUrl'

@Resolver()
export class RegisterResolver {
    @Authorized()
    @Query(() => String)
    async hello() {
        return "Hello World"
    }

    @Mutation(() => RegisterPayload)
    async register(@Arg('input') input: RegisterInput): Promise<RegisterPayload> {

        const hashedPassword = await bcrypt.hash(input.password, 12);

        const user = await User.create({
            firstName: input.firstName,
            lastName: input.lastName,
            password: hashedPassword,
            email: input.email
        }).save()

        await sendEmail(user.email, await createConfirmationUrl(user.id.toString()))

        return Object.assign(new RegisterPayload, { user })
    }
}