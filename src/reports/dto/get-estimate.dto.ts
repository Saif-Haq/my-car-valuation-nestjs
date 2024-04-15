import { Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class GetEstimateDto {
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    year: number;

    @IsString()
    model: string;

    @IsString()
    make: string;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    lng: number;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    lat: number;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    mileage: number;
}
