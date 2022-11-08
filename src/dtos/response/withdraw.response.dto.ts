import { HttpStatus } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { Accounts } from "src/db/entities/accounts.entity"

export class WithdrawResponseDto{
    
    @ApiProperty({ example: HttpStatus.CREATED })
    statusCode:number
    @ApiProperty({example:"Amount Withdrawn successfully"})
    message:string
    @ApiProperty({ type: Accounts })
    account:Accounts
    constructor(statusCode:number,message:string,respnose:Accounts){
        this.statusCode=statusCode
        this.message=message
        this.account=respnose
    }
}