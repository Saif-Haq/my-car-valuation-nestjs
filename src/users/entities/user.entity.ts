import { IsEmail } from "class-validator";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Report } from "../../reports/entities/report.entity";

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

  @OneToMany(() => Report, (report => report.user))
  reports: Report[];

  @Column({ default: true })
  isAdmin: boolean;

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
