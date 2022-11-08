import { ForbiddenException, HttpStatus, Inject, Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Accounts } from 'src/db/entities/accounts.entity';
import { Users } from 'src/db/entities/users.entity';
import { DepositRequestDto } from 'src/dtos/request/deposit.request.dto';
import { RegisterUserRequestDto } from 'src/dtos/request/register.user.request.dto';
import { WithdrawRequestDto } from 'src/dtos/request/withdraw.request.dto';
import { DepositResponseDto } from 'src/dtos/response/deposit.response.dto';
import { RegisterUserResponseDto } from 'src/dtos/response/register.user.response.dto';
import { WithdrawResponseDto } from 'src/dtos/response/withdraw.response.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepo:typeof Users,
    @Inject('ACCOUNTS_REPOSITORY')
    private accountRepo:typeof Accounts,
  ){}

  async registerUser(body:RegisterUserRequestDto){
    const user=await this.userRepo.create({...body})
    if(!user){
      throw new UnprocessableEntityException("Unable to create new user")
    }
    const account=await this.accountRepo.create({
      ownedBy:user.id,
      balance:0
    })
    
    const respUser=await this.userRepo.findOne({
      where:{id:user.id},
      include:[
        { 
          model: Accounts, 
        }
      ]
    })
    return new RegisterUserResponseDto(HttpStatus.CREATED,"User and Account successfully",respUser)
  }

  async deposit(body:DepositRequestDto){

    const acc=await this.accountRepo.findOne({where:{accountNumber:body.accountId}})
    if (!acc){
      throw new NotFoundException("Account not found")
    }
    await acc.update({balance:acc.balance+body.depositAmmount})
    await acc.save()
    return new DepositResponseDto(HttpStatus.OK,"Amount deposited successfully", acc) 
  }

  async withdraw(body:WithdrawRequestDto){
    const acc=await this.accountRepo.findOne({where:{accountNumber:body.accountId}})
    if (!acc){
      throw new NotFoundException("Account not found")
    }

    if(acc.balance<body.withdrawAmount){
      throw new ForbiddenException("Insufficient Funds")
    }

    await acc.update({balance:acc.balance-body.withdrawAmount})
    await acc.save()

    return new WithdrawResponseDto(HttpStatus.OK,"Amount Withdrawn successfully",acc)

  }


}
