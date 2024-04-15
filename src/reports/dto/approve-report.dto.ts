import { Expose, Transform } from "class-transformer";
import { IsBoolean } from "class-validator";

export class ApproveReportDto {
    @IsBoolean()
    approved: boolean;
}