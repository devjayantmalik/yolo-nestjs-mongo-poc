import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { SignupRequestDto } from './dto/signup.request.dto';
import { SignupResponseDto } from './dto/signup.response.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('/')
  async login(@Body() userDto: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      return await this.accountsService.login(userDto);
    } catch (error) {
      // We are re throwing error here, because you con control
      // what info gets dispached along with error
      throw error;
    }
  }

  @Post('/new')
  async signup(@Body() userDto: SignupRequestDto): Promise<SignupResponseDto> {
    try {
      return await this.accountsService.signup(userDto);
    } catch (error) {
      // We are re throwing error here, because you con control
      // what info gets dispached along with error.
      throw error;
    }
  }

}
