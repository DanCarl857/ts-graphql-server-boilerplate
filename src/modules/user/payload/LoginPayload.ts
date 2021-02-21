import { ObjectType, Field } from 'type-graphql'

import { User } from '../../../entity/User'

@ObjectType()
export class LoginPayload {
    @Field(() => User)
    user: User
}