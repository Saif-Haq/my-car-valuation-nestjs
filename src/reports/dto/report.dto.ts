import { Expose, Transform } from "class-transformer";

export class ReportDto {
    @Expose()
    price: number;

    @Expose()
    year: number;

    @Expose()
    model: string;

    @Expose()
    make: string;

    @Expose()
    lng: number;

    @Expose()
    lat: number;

    @Expose()
    mileage: number;

    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: number;

    @Expose()
    id: number;

    @Expose()
    approved: boolean;
}