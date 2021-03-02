import { ObjectId } from 'mongoose'
import { MyContext } from 'src/types/MyContext'
import { Resolver, Query, Ctx } from 'type-graphql'

import { User } from './../../entity/User'

declare module "express-session" {
    interface Session {
      userId: ObjectId;
    }
}

@Resolver()
export class MeResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
        if (!ctx.req.session!.userId) {
            return undefined
        }

        return User.findOne(String(ctx.req.session!.userId))
    }
}