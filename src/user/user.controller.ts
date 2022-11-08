import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
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
  
  @ApiOperation({
    summary: 'To Create a new user in this system',
    description: `This api will return an instance of  \`User\` which is created by this api call And this api will
    take name of the user in the request body`,
  })
  @ApiOkResponse({
    description: 'User created successfully',
    type: RegisterUserResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description:
      'If Connection to Database was not able to setup or was interupted, or there was an error in the query',
  })
  @ApiBadRequestResponse({
    description:
      'If the data provided is invalid, such as name is not given'
  })
  @Post('registerUser')
  async registerUser(@Body() body:RegisterUserRequestDto):Promise<RegisterUserResponseDto>{
      return await this.userService.registerUser(body)
  }


  @ApiOperation({
    summary: 'To deposit amount into account',
    description: `This api will return an instance of  \`Account\` which is  updated after deposit call. And this api will
    take account id of the account and the initial deposit amount for account`,
  })
  @ApiOkResponse({
    description: 'Amount deposited successfully',
    type: DepositResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description:
      'If Connection to Database was not able to setup or was interupted, or there was an error in the query',
  })
  @ApiBadRequestResponse({
    description:
      'If the data provided is invalid, such as accountId is not given'
  })
  @ApiNotFoundResponse({
    description: 'If given account not fonud in database',
  })
  @Post('deposit')
  async deposit(@Body() body:DepositRequestDto):Promise<DepositResponseDto>{
    return await this.userService.deposit(body)
  }

  @ApiOperation({
    summary: 'To withdraw the amount from account',
    description: `This api will return an instance of  \`Account\` which is  updated after withdraw call. And this api will
    take account id of the account and the withdraw amount from account`,
  })
  @ApiOkResponse({
    description: 'Amount withdraw successfully',
    type: WithdrawResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description:
      'If Connection to Database was not able to setup or was interupted, or there was an error in the query',
  })
  @ApiBadRequestResponse({
    description:
      'If the data provided is invalid, such as accountId is not given'
  })
  @ApiNotFoundResponse({
    description: 'If given account not fonud in database',
  })
  @ApiForbiddenResponse({
    description:"If withdraw amount is greater than the current balance of account"
  })
  @Post('withdraw')
  async withdraw(@Body() body:WithdrawRequestDto):Promise<WithdrawResponseDto>{
    return await this.userService.withdraw(body)
  }

}
