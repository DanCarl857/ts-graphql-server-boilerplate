import { IsEmail } from 'class-validator'
import { InputType, Field } from 'type-graphql'

@InputType()
export class LoginInput {
    @Field({ nullable: true })
    id: string

    @Field({ nullable: false })
    @IsEmail()
    email: string

    @Field({ nullable: false })
    password: string
}