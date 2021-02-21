import { IsEmail, Length } from 'class-validator'
import { InputType, Field } from 'type-graphql'

@InputType()
export class RegisterInput {
    @Field({ nullable: true })
    id: string

    @Field({ nullable: false })
    @Length(1, 30)
    firstName: string

    @Field({ nullable: false })
    @Length(1, 255)
    lastName: string

    @Field({ nullable: false })
    @IsEmail()
    email: string

    @Field({ nullable: false })
    password: string
}