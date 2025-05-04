import { Entity, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Person } from "./utils/Person";

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

@Entity("client")
export class Client extends Person {
  @Column({
    nullable: true,
    type: "simple-json",
  })
  additional_info: {
    age: number;
    hairColor: string;
  };

  @Column({
    default: true,
  })
  is_active: boolean;

  @Column({
    type: "simple-array",
  })
  family_members: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
