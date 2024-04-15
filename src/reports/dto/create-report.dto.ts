import { IsNumber, IsString } from "class-validator";

export class CreateReportDto {
  @IsNumber()
  price: number;
  @IsNumber()
  year: number;
  @IsString()
  model: string;
  @IsString()
  make: string;
  @IsNumber()
  lng: number;
  @IsNumber()
  lat: number;
  @IsNumber()
  mileage: number;
}
