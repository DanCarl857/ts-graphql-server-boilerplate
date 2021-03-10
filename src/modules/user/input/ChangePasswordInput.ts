import { PasswordInput } from './../../../shared/PasswordInput'
import { Field, InputType } from 'type-graphql'

@InputType()
export class ChangePasswordInput extends PasswordInput {
    @Field()
    token: string
}