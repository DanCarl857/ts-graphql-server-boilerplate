import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from 'type-graphql'
import * as bcrypt from 'bcryptjs'

import { RegisterPayload } from './payload/RegisterPayload'
import { RegisterInput } from './input/RegisterInput'
import { User } from './../../entity/User'

@Resolver(User)
export class RegisterResolver {
    @Query(() => String)
    async hello() {
        return "Hello World"
    }

    @FieldResolver()
    async name(@Root() parent: User) {
        return `${parent.firstName} ${parent.lastName}`
    }

    @Mutation(() => RegisterPayload)
    async register(@Arg('input') input: RegisterInput): Promise<RegisterPayload> {

        const hashedPassword = await bcrypt.hash(input.password, 12);

        const user = User.create({
            firstName: input.firstName,
            lastName: input.lastName,
            password: hashedPassword,
            email: input.email
        }).save()

        return Object.assign(new RegisterPayload, { user })
    }
}