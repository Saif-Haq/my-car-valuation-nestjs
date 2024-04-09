import { IsEmail } from "class-validator";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  // @Exclude()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log("Inserted User with Id: ", this.id);
  }


  @AfterRemove()
  logRemove() {
    console.log("Removed User with Id: ", this.id);
  }


  @AfterUpdate()
  logUpdate() {
    console.log("Updated User with Id: ", this.id);
  }
}
