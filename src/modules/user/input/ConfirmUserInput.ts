import { InputType, Field } from 'type-graphql'

@InputType()
export class ConfirmUserInput {
    @Field({ nullable: false })
    token: string
}