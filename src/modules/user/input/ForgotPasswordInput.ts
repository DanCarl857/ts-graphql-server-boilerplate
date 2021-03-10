import { IsEmail } from 'class-validator'
import { InputType, Field } from 'type-graphql'

@InputType()
export class ForgotPasswordInput {
    @Field({ nullable: false })
    @IsEmail()
    email: string
}