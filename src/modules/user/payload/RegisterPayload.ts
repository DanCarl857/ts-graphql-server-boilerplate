import { ObjectType, Field } from 'type-graphql'

import { User } from '../../../entity/User'

@ObjectType()
export class RegisterPayload {
    @Field(() => User)
    user: User
}