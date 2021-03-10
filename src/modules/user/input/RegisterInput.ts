import { IsEmail, Length } from 'class-validator'
import { PasswordInput } from './../../../shared/PasswordInput'
import { InputType, Field } from 'type-graphql'

@InputType()
export class RegisterInput extends PasswordInput {
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
}