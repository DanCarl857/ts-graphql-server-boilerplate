import { ObjectId } from "mongoose";
import { Field, ObjectType, ID } from "type-graphql";
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
    name: string

    @Field()
    @Column("text", { unique: true })
    email: string

}