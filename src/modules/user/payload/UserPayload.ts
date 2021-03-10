import { ObjectType, Field } from 'type-graphql'

import { User } from '../../../entity/User'

@ObjectType()
export class UserPayload {
    @Field(() => User)
    user: User
}