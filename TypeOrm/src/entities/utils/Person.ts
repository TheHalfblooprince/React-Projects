import {
  BaseEntity,
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

/*Challange: 
 create an enity of class client,
 the client should have the following attributes
 id: primary Key
 first_name
 last_name
 email, unique
 card_number
 balance
 additional_info : age, haircolor,number should be optional. 
 family_members: should be an array of string
 created_at
 updated_at
 is_active: set to default as true.

*/

@Entity()
export class Person extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
    length: 10,
  })
  card_number: string;

  @Column({
    type: "numeric",
  })
  balance: number;

  @Column()
  middle_name: string;
}
