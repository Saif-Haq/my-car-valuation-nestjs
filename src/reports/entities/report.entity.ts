import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

// console.log(User) //Undefined due to circular dependency

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @Column()
  @IsString()
  model: string;

  @Column()
  @IsString()
  make: string;

  @Column()
  @IsLongitude()
  lng: number;

  @Column()
  @IsLatitude()
  lat: number;

  @Column()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @ManyToOne(() => User, (user => user.reports))
  user: User;

  @Column()
  @IsNumber()
  @Min(0)
  @Max(899999)
  price: number;

  @Column({ default: false })
  approved: boolean;
}
