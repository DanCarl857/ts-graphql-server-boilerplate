import { Min } from 'class-validator'
import { InputType, Field } from 'type-graphql'

@InputType()
export class PasswordInput {

    @Field({ nullable: false })
    @Min(5)
    password: string
}