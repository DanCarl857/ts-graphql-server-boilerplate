import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { redis } from './redis'
import cors from 'cors'

import { RegisterResolver } from './modules/user/RegisterResolver'
import { LoginResolver } from './modules/user/LoginResolver'
import { MeResolver } from './modules/user/MeResolver'
import { ObjectId } from 'mongoose'
import { ConfirmUserResolver } from './modules/user/ConfirmUserResolver'
import { ForgotPasswordResolver } from './modules/user/ForgotPasswordResolver'
import { ChangePasswordResolver } from './modules/user/ChangePasswordResolver'

declare module "express-session" {
    interface Session {
      userId: ObjectId;
    }
}

const main = async () => {
    await createConnection()

    const schema = await buildSchema({
        resolvers: [
            RegisterResolver,
            LoginResolver,
            MeResolver,
            ConfirmUserResolver,
            ForgotPasswordResolver,
            ChangePasswordResolver
        ],
        authChecker: ({ context: { req } }) => {
            return !!req.session.userId
        }
    })

    const app = Express()
    const RedisStore = connectRedis(session)

    app.use(cors())

    app.use(
        session({
            store: new RedisStore({
                client: redis as any
            }),
            name: 'qid',
            secret: 'asdfasdfasd',
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
            }
        } as any)
    )

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }: any) => ({ req })
    })

    apolloServer.applyMiddleware({ app })
    app.listen(4000, () => console.log('Server started on http://localhost:4000/graphql'))
}

main()