import { ObjectId } from "mongoose";
import { Field, ObjectType, ID, Root } from "type-graphql";
import {Entity, Column, BaseEntity, ObjectIdColumn} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field(() => ID)
    @ObjectIdColumn()
    id: ObjectId;

    @Field()
    @Column()
    firstName: string

    @Field()
    @Column()
    lastName: string

    @Column()
    password: string

    @Field()
    name(@Root() parent: User): string {
        return `${parent.firstName} ${parent.lastName}`
    }

    @Field()
    @Column("text", { unique: true })
    email: string

}