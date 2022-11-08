import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DepositRequestDto } from 'src/dtos/request/deposit.request.dto';
import { RegisterUserRequestDto } from 'src/dtos/request/register.user.request.dto';
import { WithdrawRequestDto } from 'src/dtos/request/withdraw.request.dto';
import { DepositResponseDto } from 'src/dtos/response/deposit.response.dto';
import { RegisterUserResponseDto } from 'src/dtos/response/register.user.response.dto';
import { WithdrawResponseDto } from 'src/dtos/response/withdraw.response.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post('registerUser')
  async registerUser(@Body() body:RegisterUserRequestDto):Promise<RegisterUserResponseDto>{
      return await this.userService.registerUser(body)
  }


  @Post('deposit')
  async deposit(@Body() body:DepositRequestDto):Promise<DepositResponseDto>{
    return await this.userService.deposit(body)
  }

  @Post('withdraw')
  async withdraw(@Body() body:WithdrawRequestDto):Promise<WithdrawResponseDto>{
    return await this.userService.withdraw(body)
  }

}
