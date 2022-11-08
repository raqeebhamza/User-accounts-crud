import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class WithdrawRequestDto{

    @ApiProperty({example:1})
    @IsNotEmpty()
    @IsNumber()
    accountId :number

    @ApiProperty({example:102.2,minimum:0})
    @IsNotEmpty()
    withdrawAmount: number


}