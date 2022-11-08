import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class DepositRequestDto{

    @ApiProperty({example:1})
    @IsNotEmpty()
    @IsNumber()
    accountId :number

    @ApiProperty({example:102.2,minimum:1})
    @IsNotEmpty()
    depositAmmount: number


}